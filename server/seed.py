from random import randint, choice as random_choice
from faker import Faker
from app import app, db


from models import User, BusinessProfile, Category, Review, Bookmark

def run_seeds():
    with app.app_context():
        db.drop_all()
        db.create_all()

        # Users
        user1 = User(name="Sam", email="sam@gmail.com", role="consumer", password_hash="hash1")
        user2= User(name="Yelsin", email="yelsin@gmail.com", role="business_owner", password_hash="hash2")
        db.session.add_all([user1, user2])
        db.session.commit()

        # Business Profiles
        businessprofile1 = BusinessProfile(
            name="Cafe Good Vibes",
            contact="0712345678",
            email="cafe@goodvibes.com",
            description="A cozy cafe with great coffee.",
            owner_id=user2.id,
            #location="Nakuru",
            #photo="goodvibes.jpg"
        )
        businessprofile2 = BusinessProfile(
            name="Techie Repair",
            contact="0787654321",
            email="contact@techierepair.com",
            description="Gadget repair and more.",
            owner_id=user2.id,
            #location="Nakuru",
            #photo="techie.jpg"
        )
        db.session.add_all([businessprofile1, businessprofile2])
        db.session.commit()

        # Categories
        category1 = Category(name="Cafe", business_profile_id=businessprofile1.id)
        category2 = Category(name="Repair", business_profile_id=businessprofile2.id)
        db.session.add_all([category1, category2])
        db.session.commit()

        # Reviews
        review1 = Review(user_id=user1.id, business_profile_id=businessprofile1.id, rating=5, comments="Fantastic coffee and ambiance!")
        review2 = Review(user_id=user2.id, business_profile_id=businessprofile1.id, rating=4, comments="Nice spot for meetings.")
        review3 = Review(user_id=user1.id, business_profile_id=businessprofile2.id, rating=4, comments="Quick repair service.")
        db.session.add_all([review1, review2, review3])
        db.session.commit()


        print("Seeding complete!")

if __name__ == "__main__":
    run_seeds()