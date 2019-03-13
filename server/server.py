import json
import os
import sqlite3

from flask import Flask, g, jsonify, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

DATABASE = os.path.join(os.path.dirname(__file__), 'draco_tuner.db')

global_state = {
  'db': None
}

def get_db():
  db = global_state["db"]
  if db is None:
    print("connect to db")
    global_state["db"] = sqlite3.connect(DATABASE)
    db = global_state["db"]
  return db

def get_state(name):
  db = get_db()
  c = db.cursor()

  statement = '''SELECT json FROM state WHERE name=?'''
  c.execute(statement, (name,))

  content = c.fetchall()[0][0]

  return content

def set_state(name, json):
  db = get_db()
  c = db.cursor()
  # statement = '''INSERT INTO state VALUES ('collection', ?)'''
  statement = '''UPDATE state SET json=? WHERE name=?'''
  c.execute(statement, (json,name))

  db.commit()

@app.route('/collection', methods=['GET'])
def get_collection():
  content = get_state('collection')
  return content


@app.route('/collection', methods=['POST'])
def save_collection():
  if not request:
    abort(400)

  set_state('collection', json.dumps(request.json))

  return 'success'

@app.route('/constraints', methods=['GET'])
def get_constraints():
  content = get_state('constraints')
  return content

@app.route('/constraints', methods=['POST'])
def save_constraints():
  if not request:
    abort(400)

  set_state('constraints', json.dumps(request.json))

  return 'success'


if __name__ == '__main__':
  app.run(debug=True, host='127.0.0.1', threaded=False, processes=1)
