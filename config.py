# App Configuration - Paramaters to Direct App Behavior
# Basic Config File - Replace Hard-Coded Secret Keys When Cloning 
import os
basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    # Secret Key for Configuration - Secret Environment Variable Keys in .env File
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    # Tells Flask-SQLAlchemy Where Database is Located 
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'app.db')
    # Disables Flask-SQLAlchemy Feature that Sends Signal to App when Database Changes are Made
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # Mail Variables for Flask-Mail Configuration - Set in .env File
    MAIL_SERVER = os.environ.get('MAIL_SERVER')
    MAIL_PORT = int(os.environ.get('MAIL_PORT') or 25)
    MAIL_USE_TLS = os.environ.get('MAIL_USE_TLS') is not None
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
