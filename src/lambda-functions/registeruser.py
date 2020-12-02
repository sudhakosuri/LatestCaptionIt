import json
import pymysql
import logging
from random import choice
from string import ascii_lowercase
from connect_db import connect
from datetime import datetime

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

def lambda_handler(event, context):
    # if used with HTTP API, json data is encoded into event["body"]
    # if used with REST API, json data is event
    try:
        data = json.loads(event["body"])
    except KeyError:
        data = event
        
    try:
        firstname = data["firstname"]
        lastname = data["lastname"]
        email = data["email"]
        plan = data["plan"]
        password = data["password"]
    except KeyError as ex:
        error = f'Missing request data: "{ex}"'
        logger.error(error)
        return {
            'statusCode': 400,
            'body': json.dumps({"message": error}),
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
                },
            }

    try:
        subscribedon = data["subscribedon"]
    except:
        subscribedon = str(datetime.today().strftime('%m/%d/%Y'))

    conn = connect()
    if not conn:
        logger.error("Connection to the database failed")
        return {
        'statusCode': 500,
        'body': json.dumps({"message": "Connection to the database failed"}),
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*'
            },
        }

    try:
        with conn.cursor() as cursr:
            uid = ''.join(choice(ascii_lowercase) for i in range(8))
            # Validate Email, Username and password
            check_feasibility_query = f'select id from users where email="{email}" or firstName="{firstname}" and lastName="{lastname}"'
            logger.debug(check_feasibility_query)
            cursr.execute(check_feasibility_query)
            userrecord = cursr.fetchone()
            if userrecord:
                logger.warning(f'User already registered with id: "{userrecord[0]}"')
                return {
                    'statusCode': 403,
                    'body': json.dumps({"message": "User already registered"}),
                    'headers': {
                        'Access-Control-Allow-Headers': '*',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': '*'
                    },
                }

            plan_id_query = f"select id from plans where name='{plan}'"
            logger.debug(plan_id_query)
            cursr.execute(plan_id_query)
            plan_id = cursr.fetchone()
            logger.debug("planid: " + str(plan_id))
            if not plan_id:
                error = f'Invalid plan "{plan}"'
                logger.error(error)
                return {
                    'statusCode': 400,
                    'body': json.dumps({"message": error}),
                    'headers': {
                        'Access-Control-Allow-Headers': '*',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': '*'
                    },
                }
                
            subscribedon = subscribedon.replace('/', '-')
            query = f'insert into users (id, firstName, lastName, email, password, planId, planusage, subscribedOn) ' + \
            f'values ("{uid}", "{firstname}", "{lastname}", "{email}", "{password}", {plan_id[0]}, 0, STR_TO_DATE("{subscribedon}", "%m-%d-%y"))'
            logger.debug(query)
            cursr.execute(query)
            conn.commit()
            logger.info(f'User registered succesfully. ID: {uid}')
    except Exception as ex:
        error = f'Error creating user: {ex}'
        logger.error(error)
        return {
        'statusCode': 500,
        'body': json.dumps({"message": error}),
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*'
                },
            }

    return {
        'statusCode': 200,
        'body': json.dumps({"id": uid}),
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*'
        },
    }
