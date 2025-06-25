from random import randint, choice as random_choice
from faker import Faker
from config import app, db

from models import User, BusinessProfile, Category, Review

fake = Faker()

def run_seeds():
    with app.app_context():
        db.drop_all()
        db.create_all()

        # Seed categories
        cafe_category = Category(name="Cafe")
        repair_category = Category(name="Repair")
        db.session.add_all([cafe_category, repair_category])
        db.session.commit()

        # Seed users
        consumer_user = User(
            name="Sam",
            email="sam@gmail.com",
            role="consumer",
            password_hash="hash1"
        )
        business_owner_user = User(
            name="Yelsin",
            email="yelsin@gmail.com",
            role="business_owner",
            password_hash="hash2"
        )
        db.session.add_all([consumer_user, business_owner_user])
        db.session.commit()

        # Seed business profiles
        cafe_business = BusinessProfile(
            name="Cafe Good Vibes",
            phone=712345678,
            email="cafe@goodvibes.com",
            location=fake.city(),
            description="A cozy cafe with great coffee.",
            category_id=cafe_category.id,
        )
        repair_business = BusinessProfile(
            name="Techie Repair",
            phone=787654321,    
            email="contact@techierepair.com",
            location=fake.city(),
            description="Gadget repair and more.",
            category_id=repair_category.id,
        )
        db.session.add_all([cafe_business, repair_business])
        db.session.commit()

        # Seed reviews
        review_1 = Review(
            user_id=consumer_user.id,
            business_profile_id=cafe_business.id,
            rating=5,
            comments="Fantastic coffee and ambiance!"
        )
        review_2 = Review(
            user_id=business_owner_user.id,
            business_profile_id=cafe_business.id,
            rating=4,
            comments="Nice spot for meetings."
        )
        review_3 = Review(
            user_id=consumer_user.id,
            business_profile_id=repair_business.id,
            rating=4,
            comments="Quick repair service."
        )
        db.session.add_all([review_1, review_2, review_3])
        db.session.commit()

        print("Seeding complete!")

if __name__ == "__main__":
    run_seeds()