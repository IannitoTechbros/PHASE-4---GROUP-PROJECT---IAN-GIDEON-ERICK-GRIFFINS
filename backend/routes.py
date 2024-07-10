from flask import Blueprint
from flask_restful import Api
from controllers import ClearSession, Signup, CheckSession, Login, Logout, EventList, EventDetail, RegistrationList, CreateList
from flask_cors import CORS

api_bp = Blueprint('api', __name__)
CORS(api_bp, resources={r"/api/*": {"origins": "http://localhost:3000"}})

api = Api(api_bp)

# User Routes
api.add_resource(ClearSession, '/api/clear', endpoint='clear_session')
api.add_resource(Signup, '/api/signup', endpoint='signup')
api.add_resource(CheckSession, '/api/check_session', endpoint='check_session')
api.add_resource(Login, '/api/login', endpoint='login')
api.add_resource(Logout, '/api/logout', endpoint='logout')

# Event Routes
api.add_resource(EventList, '/api/events', endpoint='event_list')
api.add_resource(EventDetail, '/api/events/<int:event_id>', endpoint='event_detail')

# Create Event Route
api.add_resource(CreateList, '/api/events/create', endpoint='create_event')

# Registration Routes
api.add_resource(RegistrationList, '/api/events/<int:event_id>/register', endpoint='register')

