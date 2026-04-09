from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    groq_api_key: str
    mongodb_url: str = "mongodb://localhost:27017"
    db_name: str = "interviewiq"
    allowed_origins: str = "http://localhost:3000"

    class Config:
        env_file = ".env"

settings = Settings()