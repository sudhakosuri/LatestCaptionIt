import pymysql
import logging

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

RDS_HOST = "soc-db-instance.cqn1yr2onvp2.us-east-1.rds.amazonaws.com"
RDS_USER_NAME = "admin"
RDS_PASSWORD = "password1q"
RDS_DB_NAME = "soc_database"

def connect():
    """
    DB connect method
    """
    try:
        logger.debug('Connecting Database ... ')
        conn = pymysql.connect(RDS_HOST, user=RDS_USER_NAME, passwd=RDS_PASSWORD, db=RDS_DB_NAME, connect_timeout=30)
        logger.info('Database connection succesful')
        return conn
    except pymysql.MySQLError as ex:
        logger.error(f"Error connecting database: {ex}")
        return None

def validate_user(email, password):
    """
    Validates user by email and password
    returns user id if found else returns None
    """
    try:
        conn = connect()
        if conn:
            with conn.cursor() as cursr:
                query = f'select id from users where email="{email}" and password="{password}"'
                logger.debug(query)
                cursr.execute(query)
                quey_output = cursr.fetchone()
                logger.debug(quey_output)
                if quey_output:
                    return quey_output[0]
                else:
                    return None
        else:
            raise Exception('Database connection not found')
    except Exception as ex:
        logger.error(f"Error fetching user record for user {email}: {ex}")
        raise ex

def validate_user_by_token(auth_token):
    """
    Validates user by authentication token
    returns user id if found else returns None
    """
    try:
        conn = connect()
        if conn:
            with conn.cursor() as cursr:
                # TODO query to get id based on auth-token
                query = f'select userid from sessions where id="{auth_token}"'
                logger.debug(query)
                cursr.execute(query)
                quey_output = cursr.fetchone()
                if quey_output:
                    return quey_output[0]
                else:
                    return None
        else:
            raise Exception('Database connection not found')
    except Exception as ex:
        logger.error(f"Error fetching user record for token {auth_token}: {ex}")
        raise ex

if __name__ == '__main__':
    print(connect())
    print(validate_user('kaustubh@gmail.com', 'Kaustubh123#'))
    print(validate_user('userthatcanneverexist@gmail.com', 'Kaustubh123'))