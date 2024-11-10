from fastapi import FastAPI

from .core.db import init_db
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

init_db()
setup_middleware(app)

app.include_router(router)
