from fastapi import FastAPI

from .api.routes import router
from .core.config import settings
from .core.middleware import setup_middleware

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    servers=[{
        "url": "http://localhost:8080"
    }],
)

setup_middleware(app)

app.include_router(router)
