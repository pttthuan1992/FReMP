from db.mongodb import get_users_collection
from datetime import datetime

def create_user(data):
    users_collection = get_users_collection()
    users_collection.insert_one({
        "username": data.get("username"),
        "password": data.get("password"),
        "displayName": data.get("displayName") or data.get("username"),
        "joinDate": str(datetime.date(datetime.now()))
    })


def get_users():
    users_collection = get_users_collection()
    return list(
        users_collection.find({}, {"_id": False, "password": False})
    )


def get_usernames():
    users_collection = get_users_collection()
    users = list(
        users_collection.find({}, {"username": 1})
    )
    return [user.get("username") for user in users]


def update_user(username, data):
    users_collection = get_users_collection()
    users_collection.update_one(
        {"username": username},
        {"$set": {"displayName": data.get("displayName") or username}}
    )