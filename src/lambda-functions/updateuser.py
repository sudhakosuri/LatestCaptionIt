import json
import pymysql
import logging
from random import choice
from string import ascii_lowercase
from dbutils import connect
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

    logger.debug(event)
    logger.debug(data)

    try:
        userid = event["pathParameters"]["id"]
    except Exception as ex:
        error = f'Error fetching userid from request: "{ex}"'
        logger.error(error)
        return {
        'statusCode': 400,
        'body': json.dumps({"message": "Error fetching userid from the request"}),
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*'
            },
        }

    try:
        plan = data["plan"]
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

    logger.info('Database connection succesful!')

    try:
        with conn.cursor() as cursr:
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
            query = f'update users set planId={int(plan_id[0])}, subscribedOn=STR_TO_DATE("{subscribedon}", "%m-%d-%y") where id="{userid}"'
            logger.debug(query)
            cursr.execute(query)
            conn.commit()
            logger.info(f'User updated succesfully.')
    except Exception as ex:
        error = f'Error updating user: {ex}'
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
        'body': json.dumps({"message": "User updated succesfully."}),
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*'
        },
    }
