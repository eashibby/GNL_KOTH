from dataclasses import dataclass

@dataclass
class SignupPlayer():
    def __init__(self, id, battleTag, name, race, mmr, bucket):
        self.id = id
        self.battleTag = battleTag
        self.name = name
        self.race = race
        self.mmr = mmr
        self.bucket = bucket

    def __str__(self):
        return f"SignupPlayer: id: {self.id}, BattleTag:{self.battleTag}, Name: {self.name}, Race: {self.race}, MMR: {self.mmr}, Bucket: {self.bucket}" 