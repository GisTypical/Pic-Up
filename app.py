from flask import Flask

app = Flask(__name__, static_folder='./frontend/build', static_url_path='/')

app.secret_key = 'qida'


@app.errorhandler(404)
def not_found(e):
    print("hola")
    return app.send_static_file('index.html')


@app.route('/', methods=['GET'])
def index():
    return app.send_static_file('index.html')


@app.route('/api/hola')
def hello_world():
    return 'saludos usuario'
