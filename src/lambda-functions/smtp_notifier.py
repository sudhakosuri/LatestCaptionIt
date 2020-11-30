import smtplib
import os
import logging

def build_message():

    message = f""" From: {sender}
    To: {receiver}
    MIME-Version: 1.0
    Content-Type: text/html
    Subject: Note:

    {body}

    Regards,
    CaptionIt Team
    """

    return message

def send_notification():

    try:
        server = smtplib.SMTP(host, port)
        server.ehlo()
        server.starttls()
        server.login(username, password)
        server.sendmail(sender, receiver, message)
        server.close()
        return True
    except:
        # Log exception
        return False
        

def lambda_handler(event, context):

    host = os.environ['SMTPHOST']
    port = os.environ['SMTPPORT']
    sender = os.environ['SENDER']

    response = {
        "isBase64Encoded": False
    }

    # Check if there is a username, user_email and plan info in event
    try:
        username = event['username']
        user_email = event['user_email']
        plan_info = event['plan_info']
    except Exception as e:
        # Log exception here
        response['statusCode'] = 500
        return response

    send_status = send_notification()

    if send_status:
        response['statusCode'] = 200
    else:
        response['statusCode'] = 400

    return response

