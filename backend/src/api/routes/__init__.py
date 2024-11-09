from pathlib import Path
from importlib import import_module

from fastapi import APIRouter

router = APIRouter()

current_dir = Path(__file__).parent
EXCLUDED_FILES = ["__init__.py", "__pycache__"]

for route_file in current_dir.glob("*.py"):
    if route_file.name not in EXCLUDED_FILES:
        module_name = route_file.stem
        # Исправляем путь импорта
        module = import_module(f".{module_name}", package="src.api.routes")
        if hasattr(module, "router"):
            router.include_router(module.router)
