import json
import pymysql
import logging
from random import choice
from string import ascii_lowercase

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

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

    userid = event["pathParameters"]["id"]

    with conn.cursor() as cursr:
        query = f'select * from users where id="{userid}"'
        logger.debug(query)
        try:
            cursr.execute(query)
            record = cursr.fetchone()
            logger.info(query)
            if record:
                q = f'select name from plans where id={record[5]}'
                logger.debug(q)
                cursr.execute(q)
                plan = cursr.fetchone()[0]
                logger.info(plan)
                date = str(record[7]).split('-')
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