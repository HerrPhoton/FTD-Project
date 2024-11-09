import os
from functools import lru_cache

from ..core.config import settings
from ..domain.enums.model_types import ModelType


class PathService:
    """Сервис для работы с путями файлов и URL"""

    def __init__(self, settings):
        self.settings = settings
        self.root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))

    def get_model_path(self, model_type: ModelType) -> str:
        """Получение пути до модели

        :param ModelType model_type: Тип модели

        :return: Полный путь до модели
        :rtype: str
        """
        return os.path.join(self.root_dir, self.settings.MODEL_PATH.format(model_type=model_type.value))


@lru_cache
def get_path_service() -> PathService:
    """Фабричная функция для создания singleton экземпляра PathService

    :return: Экземпляр сервиса для работы с путями
    :rtype: PathService
    """
    return PathService(settings)


path_service = get_path_service()
