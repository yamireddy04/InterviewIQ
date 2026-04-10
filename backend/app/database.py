from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings
import ssl
import certifi

client = None
db = None

async def connect_db():
    global client, db
    ssl_context = ssl.create_default_context(cafile=certifi.where())
    ssl_context.check_hostname = False
    ssl_context.verify_mode = ssl.CERT_NONE
    client = AsyncIOMotorClient(
        settings.mongodb_url,
        ssl=True,
        ssl_certfile=None,
        ssl_ca_certs=certifi.where(),
        ssl_cert_reqs=ssl.CERT_NONE,
        serverSelectionTimeoutMS=30000,
    )
    db = client[settings.db_name]

async def close_db():
    global client
    if client:
        client.close()

def get_db():
    return db