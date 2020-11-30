import json
import pymysql
import logging
import dbutils
from random import choice
from string import ascii_lowercase

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
        email = data["email"]
        password = data["password"]
    except Exception as ex:
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
        userid = dbutils.validate_user(email, password)
        if userid:
            status = 200
            message = {"id": userid}
            logger.info(f"User with id: {userid} authenticated succesfully!")
        else:
            status = 404
            message = {"message": "Incorrect username or password"}
            logger.warning("Incorrect username or password")
    except Exception as ex:
        error = f"Error fetching user record for user {email}: {ex}"
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
