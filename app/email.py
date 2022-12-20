# Using Flask-Mail Extension to Send Users Emails
from flask_mail import Message
from app import mail
from flask import render_template
from app import app

# Helper Function to Send Emails to Users with Either Text or HTML Versions
def send_email(subject, sender, recipients, text_body, html_body):
    msg = Message(subject, sender=sender, recipients=recipients)
    msg.body = text_body
    msg.html = html_body
    mail.send(msg)

# Function to Send Users the Password Reset Email
def send_password_reset_email(user):
    token = user.get_reset_password_token()
    send_email('[Flask Hangman] Reset Your Password',
               sender=app.config['MAIL_USERNAME'],
               recipients=[user.email],
               text_body=render_template('email/reset_password.txt',
                                         user=user, token=token),
               html_body=render_template('email/reset_password.html',
                                         user=user, token=token))