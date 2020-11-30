import json
import pymysql
import logging
from random import choice
from string import ascii_lowercase
from connect_db import connect

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

def lambda_handler(event, context):

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
        with conn.cursor() as cursr:
            query = f'select * from users where id="{userid}"'
            logger.debug(query)
            try:
                cursr.execute(query)
                record = cursr.fetchone()
                logger.debug(record)
                if record:
                    query = f'select name from plans where id={record[5]}'
                    logger.debug(query)
                    cursr.execute(query)
                    plan = cursr.fetchone()[0]
                    logger.debug(plan)
                    date = str(record[7]).split('-')
                    logger.debug(date)
                    subscribedon = date[1] + '/' + date[2] + '/' + date[0]
                    status = 200
                    message = {
                        "id": record[0],
                        "firstname": record[1],
                        "lastname": record[2],
                        "email": record[3],
                        "plan": plan,
                        "usage": record[6],
                        "subscribedon": subscribedon
                    }
                else:
                    status = 404
                    message = {'message': f'No user found with ID : "{userid}"'}
            except Exception as ex:
                status = 404
                error = f"Error fetching user record for user {userid}: {ex}"
                logger.error(error)
                message = {"message": error}
    except Exception as ex:
        error = f'Error getting user details: {ex}'
        logger.error(error)
        status = 500
        message = {"message": error}

    return {
        'statusCode': status,
        'body': json.dumps(message),
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*'
        },
    }