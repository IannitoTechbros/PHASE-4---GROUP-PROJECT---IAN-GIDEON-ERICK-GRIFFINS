from flask import request, session
from flask_restful import Resource
from datetime import datetime

from config import db
from models import User, Event, Registration

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
            new_user.password_hash = password
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

class EventList(Resource):
    def get(self):
        events = Event.query.all()
        return [event.to_dict() for event in events], 200
    


class CreateList(Resource):
    def post(self):
        if not session.get('user_id'):
            return {'error': 'Unauthorized'}, 401

        user = User.query.get(session['user_id'])
        if not user.is_admin:
            return {'error': 'Forbidden'}, 403

        data = request.get_json()
        new_event = Event(
            name=data['name'],
            description=data['description'],
            date=datetime.strptime(data['date'], '%Y-%m-%dT%H:%M:%S'),
            creator_id=user.id
        )
        db.session.add(new_event)
        db.session.commit()
        return new_event.to_dict(), 201
    

class EventDetail(Resource):
    def get(self, event_id):
        event = Event.query.get(event_id)
        if not event:
            return {'error': 'Not Found'}, 404
        return event.to_dict(), 200

    def patch(self, event_id):
        if not session.get('user_id'):
            return {'error': 'Unauthorized'}, 401

        user = User.query.get(session['user_id'])
        if not user.is_admin:
            return {'error': 'Forbidden'}, 403

        event = Event.query.get(event_id)
        if not event:
            return {'error': 'Not Found'}, 404

        data = request.get_json()
        if 'name' in data:
            event.name = data['name']
        if 'description' in data:
            event.description = data['description']
        if 'date' in data:
            event.date = datetime.strptime(data['date'], '%Y-%m-%dT%H:%M:%S')

        db.session.commit()
        return event.to_dict(), 200

    def delete(self, event_id):
        if not session.get('user_id'):
            return {'error': 'Unauthorized'}, 401

        user = User.query.get(session['user_id'])
        if not user.is_admin:
            return {'error': 'Forbidden'}, 403

        event = Event.query.get(event_id)
        if not event:
            return {'error': 'Not Found'}, 404

        db.session.delete(event)
        db.session.commit()
        return {}, 204

class RegistrationList(Resource):
    def post(self):
        if not session.get('user_id'):
            return {'error': 'Unauthorized'}, 401

        data = request.get_json()
        new_registration = Registration(
            user_id=session['user_id'],
            event_id=data['event_id']
        )
        db.session.add(new_registration)
        db.session.commit()
        return new_registration.to_dict(), 201
