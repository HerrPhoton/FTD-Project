import base64
from functools import lru_cache

import cv2
import numpy as np


class ImageService:
    """Сервис для работы с изображениями"""

    def base64_to_numpy(self, base64_image: str) -> np.ndarray:
        """Конвертирует base64 изображение в numpy массив

        :param str base64_image: Изображение в base64
        :return: Изображение в виде numpy массива
        :rtype: np.ndarray
        """
        if ',' in base64_image:
            base64_image = base64_image.split(',')[1]

        img_bytes = base64.b64decode(base64_image)
        img_array = np.frombuffer(img_bytes, dtype=np.uint8)

        return cv2.imdecode(img_array, cv2.IMREAD_COLOR)

    def numpy_to_base64(self, numpy_image: np.ndarray) -> str:
        """Конвертирует изображение в виде numpy массива в base64

        :param np.ndarray numpy_image: Изображение в виде numpy массива
        :return: Изображение в base64
        :rtype: str
        """
        _, buffer = cv2.imencode('.jpg', numpy_image)
        base64_string = base64.b64encode(buffer).decode('utf-8')

        return f"data:image/jpeg;base64,{base64_string}"


@lru_cache
def get_image_service() -> ImageService:
    """Фабричная функция для создания singleton экземпляра ImageService

    :return: Экземпляр сервиса для работы с изображениями
    :rtype: ImageService
    """
    return ImageService()
