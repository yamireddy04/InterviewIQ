from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings
import certifi
import ssl

client = None
db = None

async def connect_db():
    global client, db
    try:
        ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_CLIENT)
        ssl_context.load_verify_locations(certifi.where())
        ssl_context.check_hostname = False
        ssl_context.verify_mode = ssl.CERT_NONE
        ssl_context.minimum_version = ssl.TLSVersion.TLSv1_2

        client = AsyncIOMotorClient(
            settings.mongodb_url,
            tls=True,
            tlsAllowInvalidCertificates=True,
            tlsAllowInvalidHostnames=True,
            serverSelectionTimeoutMS=5000,
        )
        db = client[settings.db_name]
        await client.admin.command("ping")
        print("MongoDB connected successfully")
    except Exception as e:
        print(f"MongoDB connection warning: {e}")
        print("App will continue - DB features may be limited")

async def close_db():
    global client
    if client:
        client.close()

def get_db():
    return db