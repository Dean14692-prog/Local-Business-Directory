from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy



class User(db.Model):
    __tablename__="users"
    id = db.Column(db.Integer,primary_key=True)
    name =db.Column(db.String,nullable=False)
    password_hash =db.Column(db.String,nullable=False)
    role=db.Column(db.String,default="customer")
    #Relationship
    business_profiles = db.relationship('BusinessProfile', back_populates='owner')
    reviews = db.relationship('Review', back_populates='author')

    

class BusinessProfile(db.Model):
    __tablename__="business_profiles"
    id = db.Column(db.Integer,primary_key=True)
    name =db.Column(db.String,nullable=False)
    description =db.Column(db.String,nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))

#relationship

    owner = db.relationship('User', back_populates='business_profiles')
    reviews = db.relationship('Review', back_populates='business_profile')
    category = db.relationship('Category', back_populates='business_profiles')


class Category(db.Model):
    __tablename__="categorys"
    id = db.Column(db.Integer,primary_key=True)
    name =db.Column(db.String,nullable=False)
    description =db.Column(db.String,nullable=False)
#Relationship

business_profiles = db.relationship('BusinessProfile', back_populates='category')

class Review(db.models):
    __tablename__="reviews"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    business_profile_id = db.Column(db.Integer, db.ForeignKey('business_profile.id'))
    rating = db.Column(db.Integer)
    comment = db.Column(db.Text)
#Relationship
    user = db.relationship('User', back_populates='reviews')
    business_profile = db.relationship('BusinessProfile', back_populates='reviews')

