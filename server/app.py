from flask_cors import CORS
from flask import Flask, make_response, request
from flask_restful import Api, Resource
from flask_migrate import Migrate

from models import db, User, BusinessProfile, Category, Review
import bcrypt 

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
migrate = Migrate(app, db)
api = Api(app)

class UserResource(Resource):
  def get(self):
    user_list = []
    users = User.query.all()
    for user in users:
      user_list.append(user.to_dict())
    return make_response({"users": user_list}, 200)
  def post(self):
    data = request.get_json()
    hashed_password = bcrypt.hashpw(data['password_hash'].encode('utf-8'), bcrypt.gensalt())
    new_user = User(
      name=data['name'],
      email=data['email'],
      password_hash=hashed_password,
      role=data.get('role', 'consumer')
    )
    db.session.add(new_user)
    db.session.commit()
    return make_response({"message": "User created successfully"}, 201)
api.add_resource(UserResource, '/users')

class UserByIdResource(Resource):
  def get(self, user_id):
    user = User.query.get(user_id)
    if not user:
      return make_response({"message": "User not found"}, 404)
    return make_response(user.to_dict(), 200)

  def put(self, user_id):
    data = request.get_json()
    # data['role']
    user = User.query.get(user_id)
    if not user:
      return make_response({"message": "User not found"}, 404)

    if 'role' in data:
      user.role = data['role']
    
    db.session.commit()
    return make_response({"message": "User updated successfully"}, 200)
  def delete(self, user_id):
    user = User.query.get(user_id)
    if not user:
      return make_response({"message": "User not found"}, 404)
    
    db.session.delete(user)
    db.session.commit()
    return make_response({"message": "User deleted successfully"}, 200)
  def patch(self, user_id):
    data = request.get_json()
    user = User.query.get(user_id)
    if not user:
      return make_response({"message": "User not found"}, 404)
    
    if 'name' in data:
      user.name = data['name']
    if 'email' in data:
      user.email = data['email']
    if 'password_hash' in data:
      user.password_hash = bcrypt.hashpw(data['password_hash'].encode('utf-8'), bcrypt.gensalt())
    if 'role' in data:
      user.role = data['role']
    
    db.session.commit()
    return make_response({"message": "User updated successfully"}, 200)
api.add_resource(UserByIdResource, '/users/<int:user_id>')

class BusinessProfileResource(Resource):
  def get(self):
    business_list = []
    businesses = BusinessProfile.query.all()
    for business in businesses:
      business_list.append(business.to_dict())
    return make_response({"businesses": business_list}, 200)
  
  def post(self):
    data = request.get_json()
    new_business = BusinessProfile(
      name=data['name'],
      contact=data['contact'],
      email=data['email'],
      description=data['description'],
      owner_id=data['owner_id']
    )
    db.session.add(new_business)
    db.session.commit()
    return make_response({"message": "Business profile created successfully"}, 201)
api.add_resource(BusinessProfileResource, '/business_profiles')

class BusinessProfileByIdResource(Resource):
  def get(self, business_id):
    business = BusinessProfile.query.get(business_id)
    if not business:
      return make_response({"message": "Business profile not found"}, 404)
    return make_response(business.to_dict(), 200)

  def put(self, business_id):
    data = request.get_json()
    business = BusinessProfile.query.get(business_id)
    if not business:
      return make_response({"message": "Business profile not found"}, 404)

    business.name = data['name']
    business.contact = data['contact']
    business.email = data['email']
    business.description = data['description']
    
    db.session.commit()
    return make_response({"message": "Business profile updated successfully"}, 200)
  
  def delete(self, business_id):
    business = BusinessProfile.query.get(business_id)
    if not business:
      return make_response({"message": "Business profile not found"}, 404)
    
    db.session.delete(business)
    db.session.commit()
    return make_response({"message": "Business profile deleted successfully"}, 200)
  def patch(self, business_id):
    data = request.get_json()
    business = BusinessProfile.query.get(business_id)
    if not business:
      return make_response({"message": "Business profile not found"}, 404)
    
    if 'name' in data:
      business.name = data['name']
    if 'contact' in data:
      business.contact = data['contact']
    if 'email' in data:
      business.email = data['email']
    if 'description' in data:
      business.description = data['description']
    
    db.session.commit()
    return make_response({"message": "Business profile updated successfully"}, 200)
api.add_resource(BusinessProfileByIdResource, '/business_profiles/<int:business_id>')

class CategoryResource(Resource):
  def get(self):
    category_list = []
    categories = Category.query.all()
    for category in categories:
      category_list.append(category.to_dict())
    return make_response({"categories": category_list}, 200)
  
  def post(self):
    data = request.get_json()
    new_category = Category(
      name=data['name'],
      business_profile_id=data['business_profile_id']
    )
    db.session.add(new_category)
    db.session.commit()
    return make_response({"message": "Category created successfully"}, 201)
api.add_resource(CategoryResource, '/categories')

class CategoryByIdResource(Resource):
  def get(self, category_id):
    category = Category.query.get(category_id)
    if not category:
      return make_response({"message": "Category not found"}, 404)
    return make_response(category.to_dict(), 200)

  def put(self, category_id):
    data = request.get_json()
    category = Category.query.get(category_id)
    if not category:
      return make_response({"message": "Category not found"}, 404)

    category.name = data['name']
    category.business_profile_id = data['business_profile_id']

    db.session.commit()
    return make_response({"message": "Category updated successfully"}, 200)

  def delete(self, category_id):
    category = Category.query.get(category_id)
    if not category:
      return make_response({"message": "Category not found"}, 404)

    db.session.delete(category)
    db.session.commit()
    return make_response({"message": "Category deleted successfully"}, 200)
  def patch(self, category_id):
    data = request.get_json()
    category = Category.query.get(category_id)
    if not category:
      return make_response({"message": "Category not found"}, 404)

    if 'name' in data:
      category.name = data['name']
    if 'business_profile_id' in data:
      category.business_profile_id = data['business_profile_id']

    db.session.commit()
    return make_response({"message": "Category updated successfully"}, 200)
api.add_resource(CategoryByIdResource, '/categories/<int:category_id>')

class ReviewResource(Resource):
  def get(self):
    review_list = []
    reviews = Review.query.all()
    for review in reviews:
      review_list.append(review.to_dict())
    return make_response({"reviews": review_list}, 200)
  
  def post(self):
    data = request.get_json()
    new_review = Review(
      user_id=data['user_id'],
      business_profile_id=data['business_profile_id'],
      rating=data['rating'],
      comment=data['comment']
    )
    db.session.add(new_review)
    db.session.commit()
    return make_response({"message": "Review created successfully"}, 201)
api.add_resource(ReviewResource, '/reviews')

class ReviewByIdResource(Resource):
  def get(self, review_id):
    review = Review.query.get(review_id)
    if not review:
      return make_response({"message": "Review not found"}, 404)
    return make_response(review.to_dict(), 200)

  def put(self, review_id):
    data = request.get_json()
    review = Review.query.get(review_id)
    if not review:
      return make_response({"message": "Review not found"}, 404)

    review.rating = data['rating']
    review.comment = data['comment']

    db.session.commit()
    return make_response({"message": "Review updated successfully"}, 200)

  def delete(self, review_id):
    review = Review.query.get(review_id)
    if not review:
      return make_response({"message": "Review not found"}, 404)

    db.session.delete(review)
    db.session.commit()
    return make_response({"message": "Review deleted successfully"}, 200)
  
  def patch(self, review_id):
    data = request.get_json()
    review = Review.query.get(review_id)
    if not review:
      return make_response({"message": "Review not found"}, 404)

    if 'rating' in data:
      review.rating = data['rating']
    if 'comment' in data:
      review.comment = data['comment']

    db.session.commit()
    return make_response({"message": "Review updated successfully"}, 200)
api.add_resource(ReviewByIdResource, '/reviews/<int:review_id>')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5000)