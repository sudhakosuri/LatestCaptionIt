import smtplib
import os
import pymysql
import logging
from dbutils import connect

def build_message(sender, user_name, user_email, plan_info):

    message = f"""
    Subject: CaptionIt API Plan Exhaustion
    
    Hello {user_name},
    
    Your current CaptionIt {plan_info} Plan is about to expire. Please, purchase a new plan to avoid discontinuation of the Service.

    Regards,
    CaptionIt Team
    """

    return message

def send_notification(host, port, username, password, receiver, message):
    
    try:
        server = smtplib.SMTP(host, port)
        server.ehlo()
        server.starttls()
        server.login(username, password)
        server.sendmail(username, receiver, message)
        server.close()
        return True
    except Exception as e:
        # Log exception
        print("Exception:", e)
        return False
        

def lambda_handler(event, context):

    host = os.environ['SMTPHOST']
    port = os.environ['SMTPPORT']
    sender = os.environ['SENDER']
    password = os.environ['SENDER_PASSWORD']
    response = {
        "isBase64Encoded": False
    }

    # Check if there is a username, user_email and plan info in event
    try:
        user_name = event['user_name']
        user_email = event['user_email']
        plan_info = event['plan_info']
    except Exception as e:
        # Log exception here
        response['statusCode'] = 500
        return response
    conn = connect()
    if not conn:
        # Logg error
        return None
    with conn.cursor() as crsur:
        query = 'select u.email, p.name from users u, plans p where u.planid=p.id'
        try:
            crsur.execute(query)
            details = crsur.fetchall()

        except Exception as e:
            print(e)
            return None
    for detail in details:
        receiver = detail[0]
        plain_info = detail[1]
        message = build_message(sender, user_name, receiver, plan_info)
        send_status = send_notification(host, port, sender, password, receiver, message)

    if send_status:
        response['statusCode'] = 200
    else:
        response['statusCode'] = 400

    return response
