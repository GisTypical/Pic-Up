import os

# from dotenv import load_dotenv
from flask import Flask, session
from flask.helpers import send_from_directory
from flask_sqlalchemy import SQLAlchemy

from Config import *

# load_dotenv()

app = Flask(__name__, static_folder='./frontend/build', static_url_path='/')

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# SqlAlchemy ya no admite postgres:// se debe llevar a postgresql://
uri = os.environ['DATABASE_URL']
if uri.startswith("postgres://"):
    uri = uri.replace("postgres://", "postgresql://", 1)
    
app.config['SQLALCHEMY_DATABASE_URI'] = uri
app.config.from_object(DevelopmentConfig)
db = SQLAlchemy(app)

app.secret_key = os.environ['SECRET_KEY']

from server.controllers.picture import picture_bp
from server.controllers.repository import repository_bp
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

@app.route('/uploads/<path:name>', methods=['GET'])
def send_img(name):
    return send_from_directory(os.path.join(app.root_path, 'server', 'uploads'), name, as_attachment=False)

# Blueprints que permiten separar el server en componentes
app.register_blueprint(user_bp)
app.register_blueprint(picture_bp)
app.register_blueprint(repository_bp)
