from flask import Flask, session

app = Flask(__name__, static_folder='./frontend/build', static_url_path='/')

app.secret_key = 'qid'


@app.get('/')
def index():
    return app.send_static_file('index.html')


@app.route('/api/<string:name>')
def hello_world(name):
    if not 'name' in session:
        print('no hay cookies')
        session['name'] = name
    else:
        print('si hay')
    return f'<p align=\"center\">Hello, {session["name"]}!</p>'
