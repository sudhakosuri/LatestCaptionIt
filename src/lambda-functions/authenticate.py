import json
import pymysql
import logging
from random import choice
from string import ascii_lowercase

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def lambda_handler(event, context):

    def connect():
        try:
            #rds settings
            rds_host  = "soc-db-instance.cqn1yr2onvp2.us-east-1.rds.amazonaws.com"
            name = "admin"
            password = "password1q"
            db_name = "soc_database"

            conn = None
            conn = pymysql.connect(rds_host, user=name, passwd=password, db=db_name, connect_timeout=30)
            logger.info("SUCCESS: Connection to RDS MySQL instance succeeded")
            return conn
        except pymysql.MySQLError as e:
            logger.error("ERROR: Unexpected error: Could not connect to MySQL instance.")
            logger.error(e)
            return conn

    conn = connect()
    if not conn:
        logger.error("Error connecting database")
        # return value ? check http responses
        return

    # if used with HTTP API, json data is encoded into event["body"]
    # if used with REST API, json data is event
    try:
        data = json.loads(event["body"])
    except KeyError:
        data = event

    with conn.cursor() as cursr:
        email = data["email"]
        password = data["password"]
        db_pass = None
        query = f'select id from users where email="{email}" and password="{password}"'
        logger.debug(query)
        try:
            cursr.execute(query)
            userid = cursr.fetchone()
            if userid:
                status = 200
                message = {"id": userid[0]}
            else:
                status = 404
                message = {"message": "Incorrect username or password"}
        except Exception as ex:
            logger.error(f"Error fetching user record for user {email}: {ex}")
    # TODO implement
    return {
        'statusCode': status,
        'body': json.dumps(message),
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*'
        },
    }
