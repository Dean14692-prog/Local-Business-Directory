from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy import MetaData, Enum

metadata = MetaData()
db = SQLAlchemy(metadata=metadata)


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String, unique=True, nullable=False)
    password_hash = db.Column(db.String)
    role = db.Column(Enum('consumer', 'business_owner', name='user_roles'), default='consumer')

    reviews = db.relationship('Review', back_populates='user', cascade='all, delete-orphan')
    business_profile = db.relationship('BusinessProfile', uselist=False, back_populates='user', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "role": self.role,
            "business_profile": self.business_profile.to_dict() if self.business_profile else None,
            "reviews": [review.to_dict() for review in self.reviews]
        }

    def __repr__(self):
        return f"<User id={self.id} name={self.name} email={self.email}>"


class BusinessProfile(db.Model):
    __tablename__ = 'business_profiles'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    contact = db.Column(db.String)
    email = db.Column(db.String, unique=True)
    description = db.Column(db.Text)

    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), unique=True)
    user = db.relationship('User', back_populates='business_profile')

    category = db.relationship('Category', back_populates='business_profile', uselist=False, cascade='all, delete-orphan')
    reviews = db.relationship('Review', back_populates='business_profile', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "contact": self.contact,
            "email": self.email,
            "description": self.description,
            "category": self.category.to_dict() if self.category else None,
            "reviews": [review.to_dict() for review in self.reviews]
        }

    def __repr__(self):
        return f"<BusinessProfile id={self.id} name={self.name} email={self.email}>"


class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    business_profile_id = db.Column(db.Integer, db.ForeignKey('business_profiles.id'), unique=True)

    business_profile = db.relationship('BusinessProfile', back_populates='category')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name
        }

    def __repr__(self):
        return f"<Category id={self.id} name={self.name}>"


class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    business_profile_id = db.Column(db.Integer, db.ForeignKey('business_profiles.id'))
    rating = db.Column(db.Integer)
    comment = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', back_populates='reviews')
    business_profile = db.relationship('BusinessProfile', back_populates='reviews')

    def to_dict(self):
        return {
            "id": self.id,
            "rating": self.rating,
            "comment": self.comment,
            "created_at": self.created_at.isoformat(),
            "user": {
                "id": self.user.id,
                "name": self.user.name
            }
        }

    def __repr__(self):
        return f"<Review id={self.id} rating={self.rating} user_id={self.user_id}>"
