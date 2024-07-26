from config import *
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy



class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-registrations.user',)
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    password = db.Column(db.String(200), nullable=False)
    role = db.Column(db.String(25), default='users')
    
    registrations = db.relationship('Registration', cascade='all, delete-orphan', back_populates='user')
    events = association_proxy('registrations', 'event')

    @validates('email')
    def validate_email(self, key, address):
        if '@' not in address:
            raise ValueError('Failed email validation')
        return address
    
    def __repr__(self):
        return f'<User {self.name}>'
    
class Event(db.Model, SerializerMixin):
    __tablename__ = 'events'

    serialize_rules = ('-registrations.event',)
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50))
    description = db.Column(db.String(100), nullable=False)
    date = db.Column(db.Date)
    location = db.Column(db.String(50), nullable=False)
    created_by = db.Column(db.Integer, ForeignKey('users.id'))

    registrations = db.relationship('Registration', cascade='all, delete-orphan', back_populates='event')
    users = association_proxy('registrations', 'user')

    def __repr__(self):
        return f'<Event We have a {self.title} where {self.description} on {self.date} at{self.location}>'
    
class Registration(db.Model, SerializerMixin):
    __tablename__ = 'registrations'
    serialize_rules = ('-user.registrations', '-event.registrations',)
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
    event_id = db.Column(db.Integer, ForeignKey('events.id'), nullable=False)
    user = db.relationship('User', back_populates='registrations')
    event = db.relationship('Event', back_populates='registrations')

    def __repr__(self):
        return f'<Registration {self.user} {self.event}>'
    
