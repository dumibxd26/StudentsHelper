from flask import Flask
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

from backend import routesHelper
from backend import routesStudent
from backend import routesTests
from backend import dbs

if __name__ == '__main__':
    dbs.db.create_all()
    app.run(debug=True)
