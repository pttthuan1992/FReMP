from datetime import datetime, timedelta
from db.redisdb import get_redis_db
import jwt


def create_token_by_user(username):
    redis_db = get_redis_db()
    token = jwt.encode(
        {
            'username': username,
            'exp': datetime.utcnow() + timedelta(minutes=30)
        }, "secret", "HS256"
    )
    # 1 day expire
    redis_db.set(username, token, ex=24 * 60 * 3600)
    return token.decode('utf-8')


def get_token_by_user(username):
    redis_db = get_redis_db()
    return redis_db.get(username)

