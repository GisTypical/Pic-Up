from datetime import timedelta
import os

from dotenv import load_dotenv
from flask import Flask, session
from flask_sqlalchemy import SQLAlchemy

from Config import *

load_dotenv()

app = Flask(__name__, static_folder='./frontend/build', static_url_path='/')

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config.from_object(DevelopmentConfig)
db = SQLAlchemy(app)

app.secret_key = os.environ['SECRET_KEY']
from server.controllers.user import user_bp

"""
En el caso de que se haga una petición a una ruta que el backend no conoce
se envía el index.html, React va a tomar el url y sabrá a donde llevar al usuario
mediante react-router
"""


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')


@app.route('/', methods=['GET'])
def index():
    return app.send_static_file('index.html')


# Blueprints que permiten separar el server en componentes
app.register_blueprint(user_bp)
