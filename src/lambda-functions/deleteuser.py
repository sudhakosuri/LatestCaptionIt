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
            query = f'delete from users where id="{userid}"'
            logger.debug(query)
            cursr.execute(query)
            conn.commit()
            logger.info(f'User deleted succesfully.')
    except Exception as ex:
        error = f'Error deleting user: {ex}'
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
        'body': json.dumps({"message": "User deleted succesfully."}),
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*'
        },
    }
