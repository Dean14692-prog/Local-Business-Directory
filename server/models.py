from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String, unique=True, nullable=False)
    password_hash = db.Column(db.String)
    role = db.Column(db.Enum('consumer', 'business_owner', name='user_roles'), default='consumer')
#relationship
    reviews = db.relationship('Review', back_populates='author')
    business_profile = db.relationship('BusinessProfile', uselist=False, back_populates='owner')


class BusinessProfile(db.Model):
    __tablename__ = 'business_profiles'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    contact = db.Column(db.String)
    email = db.Column(db.String, unique=True)
    description = db.Column(db.Text)

    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), unique=True)
    owner = db.relationship('User', back_populates='business_profile')
#relationship
    category = db.relationship('Category', back_populates='business_profile', uselist=False)
    reviews = db.relationship('Review', back_populates='business_profile')


class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    business_profile_id = db.Column(db.Integer, db.ForeignKey('business_profiles.id'), unique=True)
#relationship
    business_profile = db.relationship('BusinessProfile', back_populates='category')


class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    business_profile_id = db.Column(db.Integer, db.ForeignKey('business_profiles.id'))
    rating = db.Column(db.Integer)
    comment = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
#relationship
    user = db.relationship('User', back_populates='reviews')
    business_profile = db.relationship('BusinessProfile', back_populates='reviews')
