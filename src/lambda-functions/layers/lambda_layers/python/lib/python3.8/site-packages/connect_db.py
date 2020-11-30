import json
import pymysql
import logging
from random import choice
from string import ascii_lowercase

logger = logging.getLogger()
logger.setLevel(logging.INFO)

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