import os

from fastapi.staticfiles import StaticFiles

from ..services.path_service import path_service


class StaticFilesConfig:
    STATIC_DIR = os.path.join(path_service.root_dir, "static")

    @classmethod
    def setup_static_files(cls, app):
        """Настройка статических файлов для приложения"""
        app.mount("/static", StaticFiles(directory=cls.STATIC_DIR), name="static")
