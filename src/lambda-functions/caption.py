import json
import pymysql
import logging
from random import choice
from string import ascii_lowercase
import os
import boto3
import connect_db

logger = logging.getLogger()
logger.setLevel(logging.INFO)

ENDPOINT_NAME = os.environ['ENDPOINT_NAME']
runtime = boto3.client('runtime.sagemaker')

def lambda_handler(event, context):
    conn = connect_db.connect()
    # Check if database connection object is valid
    if not conn:
        # return with error
        # Notify user that error 500 occured
        status = 500 # limits fullfilled
        message = "Internal error occured."
        return {
            'statusCode': status,
            'body': json.dumps(message),
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            }
        }
        
        
    # if used with HTTP API, json data is encoded into event["body"]
    # if used with REST API, json data is event
    try:
        data = json.loads(event["body"])
    except KeyError:
        data = event
    
    with conn.cursor() as cursr:
        userid = data['id']
        query = f"select planusage, planid from users where id='{userid}'"
        
        try:
            cursr.execute(query)
            usage, planid= cursr.fetchone()
            if not isinstance(usage, int):
                usage = int(usage)

        except Exception as e:
            print("Error fetching usage", e)
            # error occured return
            status = 500 # limits fullfilled
            message = "Internal error occured."
            return {
                'statusCode': status,
                'body': json.dumps(message),
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': '*'
                }
            }
        
        query = f"select requestslimit from plans where id={planid}"
        try:
            cursr.execute(query)
            limit = cursr.fetchone()[0]

        except Exception as e:
            # error occured return
            print("Error happend in fetching planid", e)
            status = 500
        print("limit", limit)
        if usage + 1 > limit:
            # limits exhausted
            status = 203 # limits fullfilled
            message = "API usage limit reached"
            return {
                'statusCode': status,
                'body': json.dumps(message),
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': '*'
                }
            }
        else:
            pass
    
    # Create a payload for sagemaker
    payload = json.dumps({"image": data["image"]}) 
    
    # Invoke sagemaker
    response = runtime.invoke_endpoint(EndpointName=ENDPOINT_NAME,
                                      ContentType="application/json",
                                      Body=payload)
    
    result = json.loads(response['Body'].read().decode())
    if result['caption'] == {}:
        caption_generation_status = 404
    else:
        caption_generation_status = 200

    with conn.cursor() as cursr:
        userid = data["id"]
        image = data["image"]
        logger.info(data)
        query = f'update users set planusage=planusage+1 where id="{userid}"'
        logger.debug(query)
        try:
            cursr.execute(query)
            logger.debug(query)
            conn.commit()
            status = 200
        except Exception as ex:
            status = 404
            error = f"Error fetching user record for user {userid}: {ex}"
            logger.error(error)
    
    if caption_generation_status == 200:
        message = {
            "message": result['caption']
        }
        status = 200
    else:
        message = {
            "message": "Some error occured while generating the caption"
        }
        status = 404
        
    return {
        'statusCode': status,
        'body': json.dumps(message),
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*'
        }
    }
