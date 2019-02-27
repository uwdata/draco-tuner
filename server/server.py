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

@app.route('/collection', methods=['GET'])
def get_collection():
  db = get_db()
  c = db.cursor()

  c.execute('''SELECT json FROM collection WHERE id=0''')

  content = c.fetchall()

  return content


@app.route('/collection', methods=['POST'])
def save_collection():
  if not request:
    abort(400)

  db = get_db()
  c = db.cursor()
  statement = 'UPDATE collection SET json=? WHERE id=0'
  print('request')
  print(request.json)
  c.execute(statement, (request.json['collection'],))

  db.commit()

  print('done')
  return 'success'

if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0', threaded=False, processes=1)
