import sqlite3
from gnl_koth.backend.domain import SignupPlayer
from gnl_koth.backend.util import *



def executeStatement(update_statement, values = None):
    conn = sqlite3.connect("C:\\Users\\bauer\\GNL_KOTH.db")
    cur = conn.cursor()
    if values is None:
        values = []
    response = cur.execute(update_statement, values)
    result = response.fetchall()
    conn.commit()
    conn.close()
    return result

def updateSignup(player):
    select_statement = 'SELECT * FROM PlayerSignups WHERE ID = ?'
    result = executeStatement(select_statement, [player.id])
    if not result:
        update_statement = 'INSERT INTO PlayerSignups (ID,BATTLETAG,NAME ,MMR, RACE,BUCKET) VALUES( ?,?,?,?,?,?);'
        executeStatement(update_statement, (player.id, player.battleTag, player.name, player.mmr, player.race, player.bucket))
    else:
        print("Player already signed up with this Race")
        print(result)

def deleteSignup_DB(player):
    delete_statement = 'DELETE FROM PlayerSignups WHERE ID = ?'
    result = executeStatement(delete_statement, [player.id])
    print(result)
    return
        
def readBucket(bucket):
    select_statement = 'SELECT * FROM PlayerSignups WHERE BUCKET = ?'
    bucketInfo = executeStatement(select_statement, bucket)
    players = []
    for bucket in bucketInfo:
        player = SignupPlayer(bucket[0],bucket[1],bucket[2],getRaceName(bucket[4]),bucket[3],bucket[5])
        players.append(player)
        print(player)
    return players