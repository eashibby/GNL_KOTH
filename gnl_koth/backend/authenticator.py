from flask import request
from functools import wraps


def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = None
        if 'client_token' in request.args:
            token = request.args['client_token']
        if not token:
           return 'No token'
        if validateToken(token):
            return f(*args, **kwargs)
        else:
            return 'No token'
    return decorator


def validateToken(token):
    if token and token == 'my_token':
        return True
    else:
        return False
    