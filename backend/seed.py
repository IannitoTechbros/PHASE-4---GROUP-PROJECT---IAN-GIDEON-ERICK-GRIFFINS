#!/usr/bin/env python3
from app import app
from models import User, Registration, Event, db
from datetime import datetime

with app.app_context():
    User.query.delete()
    Registration.query.delete()
    Event.query.delete()

    user1 = User(name='Levis', email='levis@gmail.com', password='', role='user')
    user2 = User(name='Erick', email='erick@gmail.com', password='', role='admin')
    user3 = User(name='Mark', email='mark@gmail.com', password='', role='user')
    users = [user1, user2, user3]

    db.session.add_all(users)
    db.session.commit()

    event1 = Event(title='wedding', description='We are inviting all to attend Levis wedding', date=datetime.utcnow(), location='Kilimani', created_by=user1.name)
    event2 = Event(title='career fair', description='All to attend the career fare', date=datetime.utcnow(), location='Westlands', created_by=user2.name)
    events = [event1, event2]

    db.session.add_all(events)
    db.session.commit()

    reg1 = Registration(user_id=user1.id, event_id=event1.id)
    reg2 = Registration(user_id=user2.id, event_id=event2.id)
    reg3 = Registration(user_id=user1.id, event_id=event1.id)
    regs = [reg1, reg2, reg3]

    db.session.add_all(regs)
    db.session.commit()

    
    

