import sys
import logging
import pymysql

#rds settings
rds_host  = "soc-db-instance.cqn1yr2onvp2.us-east-1.rds.amazonaws.com"
name = "admin"
password = "password1q"
db_name = "soc_database"

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def connect(event, context):
    try:
        conn = pymysql.connect(rds_host, user=name, passwd=password, db=db_name, connect_timeout=30)
    except pymysql.MySQLError as e:
        logger.error("ERROR: Unexpected error: Could not connect to MySQL instance.")
        logger.error(e)
        sys.exit()

    logger.info("SUCCESS: Connection to RDS MySQL instance succeeded")
    return conn

def check_user_exists(event, context):

    conn = connect(event, context)
    parameters = event["queryStringParameters"]
    input_email = parameters["email"]
    input_password = parameters["password"]
    

    query = "SELECT password from users where email=\"%s\"" % (input_email)
    
    with conn.cursor() as cursor:
        cursor.execute(query)
        
        # Make sure to add zero to fetch first element off the tuple
        db_pass = cursor.fetchone()[0]
        if db_pass == input_password:
            return "{TRUE}"
        else:
            return "{FALSE}"

