import json
import pymysql
import logging
from random import choice
from string import ascii_lowercase


logger = logging.getLogger()
#logger.setLevel(logging.INFO)
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

    data = json.loads(event["body"])
    
    with conn.cursor() as cursr:
        uid = ''.join(choice(ascii_lowercase) for i in range(8))
        fname = data["firstname"]
        lname = data["lastname"]
        email = data["email"]
        plan = data["plan"]
        password = data["password"]
        subscribedon = data["subscribedon"]
        
        #if plan not in conn.execute("select name from plans"):
        #    plan = 'basic'
        
        plan_id_query = f"select id from plans where name='{plan}'"
        logger.info(plan_id_query)
        
        cursr.execute(plan_id_query)
        plan_id = cursr.fetchone()[0]
        logger.info("planid " + str(plan_id))
        if not plan_id:
            logger.warning(f"Error retrieving plan id for plan {plan}. Using basic")
            # use basic. TODO: Make this more robust
            plan_id = 1 

        subscribedon = subscribedon.replace('/', '-')
        logger.info(subscribedon)
        query = f'insert into users (id, firstName, lastName, email, password, planId, planusage, subscribedOn) ' + \
        f'values ("{uid}", "{fname}", "{lname}", "{email}", "{password}", {plan_id}, 0, STR_TO_DATE("{subscribedon}", "%m-%d-%y"))'
        logger.info(query)
        cursr.execute(query)
        conn.commit()

    # TODO implement
    return {
        'statusCode': 200,
        'body': json.dumps({"id": uid}),
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*'
        },
    }
