from pip._vendor import requests
import json
import urllib.parse
from gnl_koth.backend.domain import SignupPlayer
from gnl_koth.backend.util import *

def get_data(name, race):
    quotedName = urllib.parse.quote(name)
    url = 'https://website-backend.w3champions.com/api/players/{0}/game-mode-stats?gateWay=20&season=19'.format(quotedName)
    print("Request URL: " + url)
    content = requests.get(url)
    if (not content):
        print("no content found")
        return
    else:
        print("Content found")
        gamemodes = json.loads(content.text)
        for gamemode in gamemodes:
            print(gamemode)
            if gamemode['gameMode'] == 1 and gamemode['race'] == getRaceID(race):
                player = SignupPlayer(gamemode['id'],gamemode['playerIds'][0]['battleTag'],gamemode['playerIds'][0]['name'],gamemode['race'], gamemode['mmr'], determineBucket(gamemode['mmr']))
                return player
        return
            
def determineBucket(mmr):
    if mmr < 1450:
        return 1
    elif mmr > 1450 and mmr < 1600:
        return 2
    else:
        return 3