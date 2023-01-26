# Application Routes for Different URLs
from flask import render_template, flash, redirect, url_for
from app import app
from app.forms import LoginForm
from flask_login import current_user, login_user
from app.models import User, Game
from flask_login import logout_user
from flask_login import login_required
from flask import request
from werkzeug.urls import url_parse
from app import db
from app.forms import RegistrationForm, EditProfileForm
from app.forms import ResetPasswordRequestForm
from app.email import send_password_reset_email
from app.forms import ResetPasswordForm
import json
from app.gameplay import pick_word, hide_word


# App.route Decorator and View Function for Index/Homepage
@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html', title='Home', login=login, bg_class='adminPage')

# App.route Decorator and View Function for Login Page
# Uses Login Form, Validates User Login Information, Redirects URLs
@app.route('/login', methods=['GET','POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user is None or not user.check_password(form.password.data):
            flash('Invalid username or password')
            return redirect(url_for('login'))
        login_user(user,remember=form.remember_me.data)
        next_page = request.args.get('next')
        if not next_page or url_parse(next_page).netloc != '':
            next_page = url_for('index')
       	return redirect(next_page)
    return render_template('login.html', title='Sign In', form=form, bg_class='loginPage')

# App.route Decorator and View Function for Logging Out
@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('index'))

# App.route Decorator and View Function for Registration Page
# Uses Registration Form, Validates Registration Information, Adds Users to Database
@app.route('/register', methods=['GET',"POST"])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = RegistrationForm()
    if form.validate_on_submit():
        user = User(first_name = form.first_name.data, last_name = form.last_name.data, username=form.username.data, email=form.email.data)
        user.set_password(form.password.data)
        db.session.add(user)
        db.session.commit()
        flash('Success! Congratulations, you are now a registered user. Login now!')
        return redirect(url_for('login'))
    return render_template('register.html', title='Register', form=form, bg_class='loginPage')

# App.route Decorator and View Function for User Profile Page
# Protected Page - Login Required
@app.route('/profile/<username>')
@login_required
def profile(username):
    user =  User.query.filter_by(username=username).first_or_404()
    games_played = Game.query.filter_by(user_id=current_user.id).count()   
    games_won = Game.query.filter_by(user_id=current_user.id, game_won=True).count()
    games_lost = Game.query.filter_by(user_id=current_user.id, game_won=False).count()
    return render_template('profile.html', title="Profile Page", user=user, bg_class='adminPage', 
                            games_played=games_played, games_won=games_won, games_lost=games_lost)

# App.route Decorator and View Function for Edit Profile Page
# Protected Page - Login Required
@app.route('/edit_profile', methods=['GET', 'POST'])
@login_required
def edit_profile():
    form = EditProfileForm(current_user.username)
    if form.validate_on_submit():
        current_user.username = form.username.data
        current_user.about_me = form.about_me.data
        db.session.commit()
        flash('Success! Your changes have been saved.')
        return redirect(url_for('profile', username=current_user.username))
    elif request.method == 'GET':
        form.username.data = current_user.username
        form.about_me.data = current_user.about_me
    return render_template('edit_profile.html', title='Edit Profile', form=form, bg_class='adminPage')

# App.route Decorator and View Function for Reset Password Request Page
# Allows User to Request for a New Password to be Sent to Email
@app.route('/reset_password_request', methods=['GET', 'POST'])
def reset_password_request():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = ResetPasswordRequestForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user:
            send_password_reset_email(user)
        flash('Check your email for instructions to reset your password')
        return redirect(url_for('login'))
    return render_template('reset_password_request.html', title='Reset Password', form=form, bg_class='loginPage')

# App.route Decorator and View Function for Actual Password Reset Page
# Allows User to Enter and Set New Password Value if Link/Token is Valid
@app.route('/reset_password/<token>', methods=['GET', 'POST'])
def reset_password(token):
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    user = User.verify_reset_password_token(token)
    if not user:
        return redirect(url_for('index'))
    form = ResetPasswordForm()
    if form.validate_on_submit():
        user.set_password(form.password.data)
        db.session.commit()
        flash('Success! Your password has been reset.')
        return redirect(url_for('login'))
    return render_template('reset_password.html', title='Reset Password', form=form, bg_class='loginPage')

# App.route Decorator and View Function for Hangman Game Page
@app.route('/play_hangman')
def play_hangman():
    return render_template('play_hangman.html', title='Hangman Game', bg_class='hangmanGamePage')

# App.route Decorator and View Function for Singleplayer Hangman Game Page
@app.route('/singleplayer_hangman')
def singleplayer_hangman():
    # Opens words JSON file and returns JSON object
    # Make sure json file is in correct path
    f = open('app/static/data/words.json')
    data = json.load(f)
    # Extracts and saves list value from "words" key in words variable
    words = data["words"]
    # Closes JSON file
    f.close()
    word = pick_word(words)
    display = hide_word(word)
    return render_template('singleplayer_hangman.html', title='Hangman Game', bg_class='hangmanGamePage', word=word, display=display)

# App.route Decorator and View Function for API to Post Hangman Game Results
@app.route('/post_results', methods=['POST'])
def post_results():
    if current_user.is_authenticated and request.method == 'POST':
        data = request.get_json()
        game = Game(word=data["word"], opponent=data["opponent"], game_won=data["game_won"], incorrect_guesses=data["incorrect_guesses"], user_id=current_user.id)
        db.session.add(game)
        db.session.commit()
        return {'message': 'Success, game results were posted'}, 200
    else:
        return {'message': 'Error, game not saved because user is guest'}, 400

