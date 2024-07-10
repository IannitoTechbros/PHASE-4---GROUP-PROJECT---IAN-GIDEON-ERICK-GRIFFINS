#!/usr/bin/env python3

from app import app, db
from models import User

def create_admin(username, password):
    with app.app_context():
        if User.query.filter_by(username=username).first():
            print(f"User '{username}' already exists.")
            return
        
        admin_user = User(username=username, is_admin=True)
        admin_user.password_hash = password
        db.session.add(admin_user)
        db.session.commit()
        print(f"Admin user '{username}' created successfully.")

if __name__ == '__main__':
    import getpass

    username = input("Enter admin username: ")
    password = getpass.getpass("Enter admin password: ")
    create_admin(username, password)
