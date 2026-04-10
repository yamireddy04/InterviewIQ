from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings
import certifi

client = None
db = None

async def connect_db():
    global client, db
    client = AsyncIOMotorClient(
        settings.mongodb_url,
        tlsCAFile=certifi.where(),
        serverSelectionTimeoutMS=30000,
        connectTimeoutMS=30000,
        socketTimeoutMS=30000,
    )
    db = client[settings.db_name]

async def close_db():
    global client
    if client:
        client.close()

def get_db():
    return db