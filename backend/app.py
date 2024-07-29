from flask import render_template
from config import *
from models import User, Event, Registration
from config import bcrypt
from datetime import datetime
from flask_jwt_extended import jwt_required, get_jwt_identity

@app.errorhandler(404)
def not_found(e):
    return render_template("index.html")

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    hashed_password= bcrypt.generate_password_hash(data['password']).decode('utf-8')

    new_user = User(
        name=data['name'], 
        email=data['email'], 
        password=hashed_password,
        )
    db.session.add(new_user)
    db.session.commit()
    return make_response(jsonify({'message': 'user created successfully'}), 201)

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or 'email' not in data or 'password' not in data:
        return make_response(jsonify({'message': 'Email and password are required'}))

    user = User.query.filter_by(email=data['email']).first()
    if not user or not bcrypt.check_password_hash(user.password, data['password']):
        return make_response(jsonify({'message': 'Invalid email or password'}), 401)

    access_token = create_access_token(identity={'id': user.id, 'role': user.role})  # Ensure 'role' is included
    return make_response(jsonify(access_token=access_token, user=user.to_dict()), 200)


@app.route('/events', methods=['GET'])
def events():
    events = Event.query.all()
    events_lists = [event.to_dict() for event in events]
    return make_response(jsonify(events_lists), 200)

@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    users_list = [user.to_dict() for user in users]
    return make_response(jsonify(users_list), 200)

@app.route('/events', methods=['POST'])
@jwt_required()
def create_event():
    identity = get_jwt_identity()
    if identity['role'] != 'admin':
        return make_response(jsonify({'message': 'You cannot access ony an admin can create an event'}), 403)
    data = request.get_json()
    try:
        event_date = datetime.strptime(data['date'], '%Y-%m-%d').date()
    except ValueError:
        return make_response(jsonify({'message': 'Invalid date format. Use YYYY-MM-DD'}), 400)
    
    new_event = Event(
        title=data['title'],
        description=data['description'],
        date=event_date,
        location=data['location'],
        created_by=data['created_by']
    )
    db.session.add(new_event)
    db.session.commit()
    return make_response(jsonify({'message': 'Event created successfully'}), 201)


@app.route('/events/<int:event_id>', methods=['PATCH'])
@jwt_required()
def update_event(event_id):
    identity = get_jwt_identity()
    if identity['role'] != 'admin':
        return make_response(jsonify({'message': 'Access denied'}), 403)
    event = Event.query.get(event_id)
    if not event:
        return make_response(jsonify({'message': 'Event not found'}), 404)
    data = request.get_json()
    if not data:
        return make_response(jsonify({'message': 'No data provided'}), 400)

    if 'title' in data:
        event.title = data['title']
    if 'description' in data:
        event.description = data['description']
    if 'date' in data:
        try:
            event_date = datetime.strptime(data['date'], '%Y-%m-%d').date()
            event.date = event_date
        except ValueError:
            return make_response(jsonify({'message': 'Invalid date format. Use YYYY-MM-DD'}), 400)
    if 'location' in data:
        event.location = data['location']
    if 'created_by' in data:
        event.created_by = data['created_by']

    db.session.commit()
    return make_response(jsonify({'message': 'Event updated successfully'}), 200)


@app.route('/events/<int:event_id>', methods=['DELETE'])
@jwt_required()
def deletete_event(event_id):
    identity = get_jwt_identity()
    if identity['role'] != 'admin':
        return make_response(jsonify({'message': 'Access denied'}), 403)
    event = Event.query.get(event_id)
    
    if not event:
        return make_response(jsonify({'message': 'Event not found'}), 404)
    db.session.delete(event)
    db.session.commit()
    return make_response(jsonify({'message': 'Event deleted successfully'}), 200)


@app.route('/events/register/<int:event_id>', methods=['POST'])
@jwt_required()
def register_event(event_id):
    identity = get_jwt_identity()
    if not identity:
        return make_response(jsonify({'message': 'Authentication required'}), 401)
    
    user_id = identity['id']
    event = Event.query.get(event_id)
    
    if not event:
        return make_response(jsonify({'message': 'Event not found'}), 404)
    
    # Check if the user is already registered for this event
    registration = Registration.query.filter_by(event_id=event_id, user_id=user_id).first()
    if registration:
        return make_response(jsonify({'message': 'Already registered for the event'}), 400)
    
    # Create a new registration entry for the event and user
    new_registration = Registration(event_id=event_id, user_id=user_id)
    db.session.add(new_registration)
    db.session.commit()
    
    return make_response(jsonify({'message': 'Registered successfully for the event'}), 200)

    
if __name__ == '__main__':
    app.run(debug=True)

