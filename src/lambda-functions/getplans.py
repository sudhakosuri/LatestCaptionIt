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

    with conn.cursor() as cursr:
        query = f'select * from plans'
        logger.debug(query)
        try:
            cursr.execute(query)
            records = cursr.fetchall()
            logger.info(query)
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
