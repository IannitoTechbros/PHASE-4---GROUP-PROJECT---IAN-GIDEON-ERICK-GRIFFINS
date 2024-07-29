from flask import Flask, make_response, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData, ForeignKey
from sqlalchemy_serializer import SerializerMixin
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity


metadata = MetaData(
    naming_convention={
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    }
)

app = Flask(
    __name__,
    static_url_path='',
    static_folder='../client/build',
    template_folder='../client/build'
)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///events.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = '57f804c427f744988ae5e25ef4067a0c'
app.config['JWT_SECRET_KEY'] = '12345'
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

db = SQLAlchemy(metadata=metadata)
db.init_app(app)
migrate= Migrate(app, db)

