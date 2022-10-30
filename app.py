import os

# from dotenv import load_dotenv
from apifairy import APIFairy
from flask import Flask
from flask.helpers import send_from_directory
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

from Config import DevelopmentConfig

# from dotenv import load_dotenv
# load_dotenv()

# Load flask, setting static folder for loading React App
app = Flask(__name__, static_folder="./frontend/build", static_url_path="/")


# SqlAlchemy does not allow postgres:// anymore, change into postgresql://
uri = os.environ["DATABASE_URL"]
if uri.startswith("postgres://"):
    uri = uri.replace("postgres://", "postgresql://", 1)

app.config.from_object(DevelopmentConfig)

app.config["SQLALCHEMY_DATABASE_URI"] = uri
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)
migrate = Migrate(app, db)

app.secret_key = os.environ["SECRET_KEY"]

apifairy = APIFairy(app)
ma = Marshmallow(app)

"""
En el caso de que se haga una petición a una ruta que el backend no conoce
se envía el index.html, React va a tomar el url y sabrá a donde
llevar al usuario mediante react-router
"""


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file("index.html")


@app.route("/", methods=["GET"])
def index():
    return app.send_static_file("index.html")


@app.route("/uploads/<path:name>", methods=["GET"])
def send_img(name):
    return send_from_directory(
        os.path.join(app.root_path, "server", "uploads"), name, as_attachment=False
    )


from server.controllers.picture import picture  # noqa: E402
from server.controllers.repository import repository  # noqa: E402
from server.controllers.user import user  # noqa: E402

# Blueprints
app.register_blueprint(user)
app.register_blueprint(picture)
app.register_blueprint(repository)
