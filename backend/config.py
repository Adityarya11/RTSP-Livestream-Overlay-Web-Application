from pymongo import MongoClient
import os

# MongoDB connection
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/")
DB_NAME = "rtsp_overlay_db"

# Initialize MongoDB client
client = MongoClient(MONGO_URI)
db = client[DB_NAME]

# Collections
overlays_collection = db["overlays"]

def get_db():
    """Returns the database instance"""
    return db

def get_overlays_collection():
    """Returns the overlays collection"""
    return overlays_collection