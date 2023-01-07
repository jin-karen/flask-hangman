# Flask-SQLAlchemy Database Models - Data Represented by Classes
from datetime import datetime
from app import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from app import login
from hashlib import md5
from time import time
import jwt
from app import app

# Database User Model 
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(64), index=True)
    last_name = db.Column(db.String(64), index=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    about_me = db.Column(db.String(140))
    games = db.relationship('Game', backref='player', lazy='dynamic')

    def __repr__(self):
        return '<User {}>'.format(self.username)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    # Generate User Avatar with Gravatar
    def avatar(self, size):
        # MD5 Hash of User's Lowercased Email in Byte (Not String) as Hex Digits
        digest = md5(self.email.lower().encode('utf-8')).hexdigest()
        # Gravatar Image Returned - Unregistered Avatars Default to "wavatar"
        return 'https://www.gravatar.com/avatar/{}?d=wavatar&s={}'.format(digest, size)

    # Generates Token for Reset Password Links 
    # With User ID, Expiration Time, SECRET_KEY, and HS256 Algorithm
    def get_reset_password_token(self, expires_in=600):
        return jwt.encode(
            {'reset_password': self.id, 'exp': time() + expires_in},
            app.config['SECRET_KEY'], algorithm='HS256')

    # Static Method to Verify if Token is Authentic and Valid
    # Returns User ID if Valid
    @staticmethod
    def verify_reset_password_token(token):
        try:
            id = jwt.decode(token, app.config['SECRET_KEY'],
                            algorithms=['HS256'])['reset_password']
        except:
            return
        return User.query.get(id)
    

# Database Game Model
class Game(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    game_won = db.Column(db.Boolean, unique=False, default=True)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    opponent = db.Column(db.String(64))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __repr__(self):
        return '<Game with {}>'.format(self.opponent)

# User Loader for Flask_Login to Check current_user        
@login.user_loader
def load_user(id):
    return User.query.get(int(id))



    






