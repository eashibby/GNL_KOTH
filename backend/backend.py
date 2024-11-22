from flask import Flask
from flask import jsonify
import json
from . import app
from gnl_koth.backend.signup import *
from gnl_koth.backend.repository import *
from gnl_koth.backend.authenticator import token_required

@app.route("/get_bucket/<bucket>")
def bucket(bucket):
    players = findBucket(bucket)
    response = []
    for player in players:
        print(player)
        response.append(player.__dict__)
    response = jsonify(response)
    return response

@app.route("/signup/<name>/<race>")
def signup(name, race):
    player = registerSignup(name, race)
    print("Player found: {0}".format(player))
    if not player:
        return "No Player information found",400
    else:
        return jsonify(player.__dict__)

@app.route("/remove_signup/<name>/<race>")
#  @token_required
def removeSignup(name, race):
    deleteSignup(name, race)
    return jsonify("Player Successfully removed")