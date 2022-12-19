# Application Routes for Different URLs
from flask import render_template, flash, redirect, url_for
from app import app
from app.forms import LoginForm
from flask_login import current_user, login_user
from app.models import User
from flask_login import logout_user
from flask_login import login_required
from flask import request
from werkzeug.urls import url_parse
from app import db
from app.forms import RegistrationForm, EditProfileForm

# App.route Decorator and View Function for Index/Homepage
@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html', title='Home', login=login)

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
    return render_template('login.html', title='Sign In', form=form)

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
        flash('Congratulations, you are now a registered user! Login now!')
        return redirect(url_for('login'))
    return render_template('register.html', title='Register', form=form)

# App.route Decorator and View Function for User Profile Page
# Protected Page - Login Required
@app.route('/user/<username>')
@login_required
def user(username):
    user =  User.query.filter_by(username=username).first_or_404()
    return render_template('user.html', title="Profile Page", user=user)

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
        flash('Your changes have been saved.')
        return redirect(url_for('user', username=current_user.username))
    elif request.method == 'GET':
        form.username.data = current_user.username
        form.about_me.data = current_user.about_me
    return render_template('edit_profile.html', title='Edit Profile', form=form)