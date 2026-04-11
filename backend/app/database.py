from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings
import certifi

client = None
db = None

async def connect_db():
    global client, db
    try:
        client = AsyncIOMotorClient(
            settings.mongodb_url,
            tlsCAFile=certifi.where(),
            serverSelectionTimeoutMS=10000,
            connectTimeoutMS=10000,
            socketTimeoutMS=10000,
        )
        await client.admin.command("ping")
        db = client[settings.db_name]
        print("MongoDB connected successfully")
    except Exception as e:
        print(f"MongoDB connection failed: {e}")
        client = None
        db = None

async def close_db():
    global client
    if client:
        client.close()

def get_db():
    return db