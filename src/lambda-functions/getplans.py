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
        with conn.cursor() as cursr:
            query = f'select * from plans'
            logger.debug(query)
            try:
                cursr.execute(query)
                logger.debug(query)
                records = cursr.fetchall()
                logger.debug(records)
                if records:
                    message = []
                    for record in records:
                        status = 200
                        plan = {
                            "id": str(record[0]),
                            "name": str(record[1]),
                            "price": str(record[2]),
                            "duration": str(record[3]),
                            "limit": str(record[4])
                        }
                        message.append(plan)
                else:
                    status = 404
                    message = {'message': f'No plans found'}
            except Exception as ex:
                status = 404
                error = f"Error fetching plans"
                logger.error(error)
                message = {"message": error}
    except Exception as ex:
        status = 500
        error = f'Error fetching plans: "{ex}"'
        logger.error(error)
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
