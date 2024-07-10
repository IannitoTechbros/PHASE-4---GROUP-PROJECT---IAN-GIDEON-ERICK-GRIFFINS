#!/usr/bin/env python3

from flask import request, session
from flask_restful import Api, Resource
from config import app, db
from models import User

# Initialize API
api = Api(app)

# Resource classes
class ClearSession(Resource):
    def delete(self):
        session['page_views'] = None
        session['user_id'] = None
        return {}, 204

class Signup(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        if username and password:
            new_user = User(username=username)
            new_user.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
            db.session.add(new_user)
            db.session.commit()
            session['user_id'] = new_user.id
            return new_user.to_dict(), 201
        return {'error': '422 Unprocessable Entity'}, 422

class CheckSession(Resource):
    def get(self):
        if session.get('user_id'):
            user = User.query.filter(User.id == session['user_id']).first()
            return user.to_dict(), 200
        return {}, 204

class Login(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        user = User.query.filter(User.username == username).first()
        if user and user.authenticate(password):
            session['user_id'] = user.id
            return user.to_dict(), 200
        return {'error': '401 Unauthorized'}, 401

class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return {}, 204

# Add resources to API
api.add_resource(ClearSession, '/api/clear')
api.add_resource(Signup, '/api/signup')
api.add_resource(CheckSession, '/api/check_session')
api.add_resource(Login, '/api/login')
api.add_resource(Logout, '/api/logout')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
