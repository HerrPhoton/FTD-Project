from functools import lru_cache

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = "FIREDET API"
    VERSION: str = "1.0.0"

    BASE_URL: str

    class Config:
        env_file = ".env"


@lru_cache
def get_settings():
    return Settings()


settings = get_settings()
