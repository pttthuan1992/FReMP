from pymongo import MongoClient

## TODO: Create config.yml
mongoClient = MongoClient('mongodb://127.0.0.1:27017')
db = mongoClient.get_database('mydb')
users_collection = db.get_collection('user_collection')


def get_users_collection():
    return users_collection

