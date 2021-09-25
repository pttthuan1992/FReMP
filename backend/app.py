from flask import Flask, jsonify, request
from flask_cors import CORS
from modules.errors import (
    RESPONSE_USERNAME_PASSWORD_INCORRECT,
    RESPONSE_CREATE_TOKEN_ERROR,
    USERNAME_EXISTS_ERROR,
    CREATE_USER_ERROR,
    GET_USER_ERROR,
    USERNAME_NOT_FOUND,
    UPDATE_USER_ERROR
)

from modules.authentication import create_token_by_user, get_token_by_user
from modules.users import create_user, get_users, update_user, get_usernames, \
    verify_account

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/users', methods=['GET', 'POST', 'PUT'])
def users():
    if request.method == 'POST':
        data = request.json
        username = data.get("username")
        if get_usernames(username):
            return USERNAME_EXISTS_ERROR
        try:
            create_user(data)
            return jsonify("Created user {}".format(username))
        except Exception as ex:
            print(ex)
            return CREATE_USER_ERROR
    elif request.method == 'GET':
        try:
            return jsonify(get_users())
        except Exception as ex:
            print(ex)
            return GET_USER_ERROR
    elif request.method == 'PUT':
        data = request.json
        username = data.get('username')
        if not get_usernames(username):
            return USERNAME_NOT_FOUND
        try:
            update_user(username, data)
            return jsonify("Updated user {}".format(username))
        except Exception as ex:
            print(ex)
            return UPDATE_USER_ERROR


@app.route('/login/oauth', methods=['GET', 'POST'])
def login():
    """REST API for login operation"""
    if request.method == 'POST':
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")
        try:
            is_exist = verify_account(username, password)
            if not is_exist:
                return RESPONSE_USERNAME_PASSWORD_INCORRECT
            else:
                token = create_token_by_user(username)
                return jsonify({'token': token})
        except Exception as ex:
            print(ex)
            return RESPONSE_CREATE_TOKEN_ERROR

    elif request.method == 'GET':
        username = request.args.get('username')
        if not get_usernames(username):
            return USERNAME_NOT_FOUND
        token = get_token_by_user(username)
        if token:
            return jsonify({"token": token.decode('utf-8')})
        return jsonify({
            "error": "TOKEN_NOT_EXIST",
            "message": "The token for user was not created or expired"
        }), 400


if __name__ == "__main__":
    app.run(debug=True)
