from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4

db=SQLAlchemy()

def get_uuid():
    return uuid4().hex

class User(db.Model):
    __tablename__="users"
    id=db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid())
    email=db.Column(db.String(345),nullable=False)
    username=db.Column(db.String(30), unique=True, nullable=False)
    password=db.Column(db.Text,nullable=False)
    is_contact_public=db.Column(db.Boolean())
    comments=db.relationship("Comments",backref="commentUser",lazy=True)
    favorite=db.relationship("Favorites",backref="favoriteUser",lazy=True)

class Train(db.Model):
    __tablename__="trains"
    id=db.Column(db.Integer(),primary_key=True,unique=True)
    train_type=db.Column(db.String(15), nullable=False)
    series_number=db.Column(db.String(20), nullable=False)
    nickname=db.Column(db.String(40), nullable=False)
    producer=db.Column(db.String())
    produce_begins=db.Column(db.Integer())
    produce_ends=db.Column(db.Integer())
    info=db.Column(db.String())
    image_url=db.Column(db.String(), nullable=False)
    comments=db.relationship("Comments",backref="commentTrain",lazy=True)
    favorite=db.relationship("Favorites",backref="favoriteTrain",lazy=True)

    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class Favorites(db.Model):
    __tablename__="favorites"
    id=db.Column(db.Integer(),primary_key=True,unique=True)
    user_id=db.Column(db.String(32),db.ForeignKey("users.id"))
    train_id=db.Column(db.Integer(),db.ForeignKey("trains.id"))

    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class Comments(db.Model):
    __tablename__="comments"
    id=db.Column(db.Integer(),primary_key=True,unique=True)
    username=db.Column(db.String(30),db.ForeignKey("users.username"))
    train_id=db.Column(db.Integer(),db.ForeignKey("trains.id"))
    comment=db.Column(db.Text, nullable=False)
    created=db.Column(db.String(), nullable=False)
    answer_to=db.Column(db.Integer())

    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}