# Flask Hangman Web Application

## Description
A web application for singleplayer hangman built using Python, Flask, CSS, HTML, Javascript, and Bootstrap. This project is an enhanced rework of my previous python hangman game, which was run on Powershell. The web application has the functionality to create new accounts, to login, to reset passwords, generate profile pages with a customizable about me, pick random words to run through hangman games, and to store game statistics. It's currently only available for singleplayer gamemode in order to focus and showcase the entirety of the web application's frontend and backend. 

## To Run
This project is live at: https://jin-flask-hangman.onrender.com/

It can also be run locally by following the instructions below. 

### Prerequisites
In order to run the web application locally, first ensure you have a Python 3.x version installed. Then clone the project repositiory to your local computer.

### Create virtual environment 
You should create a virtual environment in Python to have all the package versions needed to run this project without affecting the system-wide Python interpreter. In order to do so, navigate in your command line interface (CLI) to the root directory of the repository you just cloned and type: 
``` 
python -m venv venv 
``` 
Depending on your operating system, you may need to use ` python3 ` instead of ` python `. The second ` venv ` is the name of the virtual environment but you can set whatever name you want, as long as you keep it the same when you activate your environment. To activate and use your virtual environment, type: 
``` 
venv\Scripts\activate 
```

### Install Dependencies
The dependencies required to run this project is listed in the requirements.txt file. You can download the packages by entering this in the CLI: 
```
pip install -r requirements.txt
```

### Configuration/ENV File
Currently, the configuration file (config.py in the root directory) includes only configuration variables set equivalent to operating system (OS) environmental variables, no hardcoded configuration items. Nothing in the configuration file needs to be changed. However, in order to run the project locally, you'll need to create a file in the root directory called ` .env ` (left out for security purposes). Within this file, you'll need to include the following environment variables and replace the Xs with your own keys and information: 
``` 
SECRET_KEY=XXXXXXXXXXX 
MAIL_SERVER=smtp.googlemail.com 
MAIL_PORT=587 
MAIL_USE_TLS=1 
MAIL_USERNAME=XXXXXXXX@XXXX.XXX
MAIL_PASSWORD=XXXXXXXXXXXXX 
```
The secret key is an important part of Flask applications and its value is used as a cryptographic key to protect the site. Its value can be anything you decide and should typically be something no one knows. The five MAIL variables are used by Flask-Mail to send automated emails to the user. The MAIL_SERVER depends on the email server but if you're using a gmail account then the value above (smtp.googlemail.com) is correct and should not be changed. Gmail also uses the 587 PORT (MAIL_PORT) for TLS (Secure Content Encryption), which is indicated as being true with the integer 1 for MAIL_USER. The MAIL_USERNAME should be set equivalent to your email address and the MAIL_PASSWORD should be your email or app password. Please note that Google no longer supports the use of third-party apps or devices trying to sign in to your account. In order to circumvent this, you'll need to enable 2 factor authentication and then generate an app password that you'll use as your password for MAIL_PASSWORD.

### Database/Migrations
This web application uses an SQLite database that is managed by an Object Relational Mapper (ORM) called SQLAlchemy (Flask-SQLALchemy extention). It also utilizes a migration framework called Alembic (Flask-Migrate extension) to make schema changes by following migration scripts added to the migrations repository. The database schema is already created in the project repository (models.py file) and the necessary migration scripts are saved in the migrations repository, but you will need to to apply all the migration scripts to update the database and use it. To do so, enter the following in the CLI: 
``` 
flask db upgrade 
``` 
You will then have access to a valid database for users and games. Please note that the Javascript API POST requests made in the static Javascript file (script.js) utilizes fetch to save game data, so it may not work for older browsers.

## Project Takeaways
When creating this web application, I used a more diverse tech stack than my first hangman game and learned a lot of new concepts and processes that are showcased in the code. In order to complete this project, I educated myself on the microframework Flask by following Miguel Grinberg's [Flask Mega-Tutorial](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world) and supplemented my learning with [Flask Documentation](https://flask.palletsprojects.com/en/2.2.x/). While learning Flask, I was exposed to new concepts such as: 
* virtual environments
* view functions and routes
* html templates and template inheritance
* forms using Flask-WTF
* placeholders and control statements using Jinja2 (e.g. conditionals and loops)
* SQLite database using the Flask-SQLAlchemy extension (ORM)
* database migration with the Flask-Migrate extension for Alembic
* static files
* environment variables
* configuration items and variabes
* sending automated emails with Flask-Mail
* password hashing and verification with Werkzeug
* creating an API for post requests, etc.

I also gained an understanding on the CSS framework Bootstrap 5 in order to focus more on creating the web application and gameplay scripts. I utilized a number of its components in my HTML templates (including Flask-WTF form templates) and complemented it with my own static CSS file. I was also able to brush up on existing knowledge in HTML, CSS, and Javascript and expand it by implementing the following topics: 
* HTML canvas
* accessing and manipulating canvases and context with Javascript
* window.devicePixelRatio
* background gradients
* event listeners (with the once property)
* Javascript API requests
* responsive designs, etc. 

Additionally, this project provided an opportunity to use gitignore and requirement.txt files for the first time. Lastly, I learned how to host web services on Render, which is where the project is currently hosted live.

## Credits
[Miguel Grinberg Flask Mega Tutorial](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world)

[MDBootstrap](https://mdbootstrap.com/docs/standard/extended/login/)

[Desi Quintans' 6,800+ Noun List](https://www.desiquintans.com/nounlist)