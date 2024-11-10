from fastapi import FastAPI

from .core.db import init_db
from .api.routes import router
from .core.config import settings
from .core.middleware import setup_middleware
from .infrastructure.static import StaticFilesConfig

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    servers=[{
        "url": "http://0.0.0.0:8080"
    }],
)

init_db()
setup_middleware(app)
StaticFilesConfig.setup_static_files(app)

app.include_router(router)
