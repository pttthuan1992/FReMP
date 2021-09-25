RESPONSE_USERNAME_PASSWORD_INCORRECT = ({
    "error": "USER_PASSWORD_INCORRECT",
    "message": "Username or Password is incorrect"
}), 400

RESPONSE_CREATE_TOKEN_ERROR = ({
    "error": "GET_TOKEN_ERROR",
    "message": "Unexpected error happened while generating access "
               "token"
}), 400

USERNAME_EXISTS_ERROR = ({
    "error": "USERNAME_EXISTS",
    "message": "The username already exists in the system"
}), 400

CREATE_USER_ERROR = ({
    "error": "CREATE_USER_ERROR",
    "message": "Could not add user"
}), 500

GET_USER_ERROR = ({
    "error": "GET_USER_ERROR",
    "message": "Could not get user"
}), 500

USERNAME_NOT_FOUND = ({
    "error": "USERNAME_NOT_FOUND",
    "message": "The username does not exist"
}), 400

UPDATE_USER_ERROR = ({
    "error": "UPDATE_USER_ERROR",
    "message": "Could not update user"
}), 500

TOKEN_NOT_EXIST = ({
    "error": "TOKEN_NOT_EXIST",
    "message": "The token for user was not created or expired"
}), 400
