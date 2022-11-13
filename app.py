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

app.config.from_object(DevelopmentConfig)

db = SQLAlchemy(app)
migrate = Migrate(app, db)

apifairy = APIFairy(app)
ma = Marshmallow(app)

"""
If for some case there's a request made to a path that the backend doesn't know, send
the index.html and React will grab the url knowing where to take the take the user via
react-router
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
