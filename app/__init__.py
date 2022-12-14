# File Executes and Defines Package Symbols for Application
from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager

# Initiate the Flask app
app = Flask(__name__)
# Use the config.py file for configuration
app.config.from_object(Config)
# Use SQLAlchemy for database management
db = SQLAlchemy(app)
# Use Flask-Migrate extension for database migration management
migrate = Migrate(app, db)
# Use Flask-Login extension for login form
## Initializes the extension
login = LoginManager(app)
## Tells flask-login which is login view function to use protected pages
login.login_view = 'login'

from app import routes, models

