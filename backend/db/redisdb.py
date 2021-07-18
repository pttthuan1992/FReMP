import redis
redis_db = redis.Redis(
    host='localhost',
    port='6379')


def get_redis_db():
    return redis_db
