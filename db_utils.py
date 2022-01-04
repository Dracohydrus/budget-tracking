import keyring

def get_database():
    from pymongo import MongoClient
    import pymongo

    mongo_username = keyring.get_password("crypto_trade_db","username")
    mongo_password = keyring.get_password("crypto_trade_db","password")
    mongo_cluster_url = "cluster0"
    CONNECTION_STRING = f"mongodb+srv://{mongo_username}:{mongo_password}@{mongo_cluster_url}.rcdal.mongodb.net/crypto_trade?retryWrites=true&w=majority"

    # from pymongo import MongoClient
    client = MongoClient(CONNECTION_STRING)
    return client["crypto_trade"]

if __name__ == "__main__":
    dbname = get_database()

def get_client():
    client = get_database()
    return client

def getDatabase(databaseName):
    dbname = get_database()
    return dbname[databaseName]