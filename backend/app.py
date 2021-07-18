from flask import Flask, jsonify, request
from flask_cors import CORS
from samba.dcerpc.smb_acl import user

from modules.authentication import create_token_by_user, get_token_by_user
from modules.users import create_user, get_users, update_user, get_usernames
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/users', methods=['GET', 'POST', 'PUT'])
def users():
    if request.method == 'POST':
        data = request.json
        username = data.get("username")
        if username in get_usernames():
            return jsonify({
                "error": "USERNAME_EXISTS",
                "message": "The username already exists in the system"
            }), 400
        try:
            create_user(data)
            return jsonify("Created user {}".format(username))
        except Exception as ex:
            print(ex)
            return jsonify({
                "error": "CREATE_USER_ERROR",
                "message": "Could not add user"
            }), 500
    elif request.method == 'GET':
        try:
            return jsonify(get_users())
        except Exception as ex:
            print(ex)
            return jsonify({
                "error": "GET_USER_ERROR",
                "message": "Could not get user"
            }), 500
    elif request.method == 'PUT':
        data = request.json
        username = data.get('username')
        if username not in get_usernames():
            return jsonify({
                "error": "USERNAME_NOT_FOUND",
                "message": "The username does not exist"
            }), 400
        try:
            update_user(username, data)
            return jsonify("Updated user {}".format(username))
        except Exception as ex:
            print(ex)
            return jsonify({
                "error": "UPDATE_USER_ERROR",
                "message": "Could not update user"
            }), 500


@app.route('/login/oauth', methods=['GET', 'POST'])
def login():
    """REST API for login operation"""
    if request.method == 'POST':
        data = request.get_json()
        username = data.get("username")
        if username not in get_usernames():
            return jsonify({
                "error": "USERNAME_NOT_FOUND",
                "message": "The username does not exist"
            }), 400
        try:
            token = create_token_by_user(username)
            return jsonify({'token': token})
        except Exception as ex:
            print(ex)
            return jsonify({
                "error": "GET_TOKEN_ERROR",
                "message": "Unexpected error happened while generating access "
                           "token"
            }), 400

    elif request.method == 'GET':
        username = request.args.get('username')
        if username not in get_usernames():
            return jsonify({
                "error": "USERNAME_NOT_FOUND",
                "message": "The username does not exist"
            }), 400
        token = get_token_by_user(username)
        if token:
            return jsonify({"token": token.decode('utf-8')})
        return jsonify({
            "error": "TOKEN_NOT_EXIST",
            "message": "The token for user was not created or expired"
        }), 400


if __name__ == "__main__":
    app.run(debug=True)