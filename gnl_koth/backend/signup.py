from gnl_koth.backend.repository import *
from gnl_koth.backend.domain import SignupPlayer
from gnl_koth.backend.w3champions import get_data

def registerSignup(name, race):
    print("Signup: " + name + " | " + race)
    player = get_data(name, race)
    print(player)
    if player: 
        updateSignup(player)
        return player
    return

def deleteSignup(name, race):
    print("Remove Signup: " + name + " | " + race)
    player = get_data(name, race)
    if player: 
        deleteSignup_DB(player)
        return player
    return


def findBucket(bucket):
    return readBucket(bucket)