# Defines the Flask Application Instance, Database, Database Models
from app import app, db
from app.models import User, Game

# Shell Context - Runs Python Interpreter in App Context
# Use flask shell to Run without Explicit Import Each Time of db, User, Game
@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'User': User, 'Game': Game}