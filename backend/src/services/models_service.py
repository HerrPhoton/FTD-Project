from functools import lru_cache

import numpy as np
from ultralytics.engine.results import Results
from ultralytics.utils.plotting import Annotator

from ..domain.enums.model_types import ModelType
from ..infrastructure.nn.yolo_model import YOLOModel


class ModelsService:

    def __init__(self):
        self._models: dict[ModelType, YOLOModel] = {}
        self._initialize_models()

        self._colors = {ModelType.FIRE: (0, 0, 255), ModelType.SMOKE: (64, 64, 64)}

    def _initialize_models(self):
        """Инициализация всех доступных моделей"""

        available_models = [model_type for model_type in ModelType if model_type != ModelType.ALL]

        for model_type in available_models:
            self._models[model_type] = YOLOModel(model_type)

    def get_model(self, model_type: ModelType) -> YOLOModel:
        """Получение модели по типу

        :param ModelType model_type: Тип модели
        :return: Экземпляр YOLO модели
        :rtype: YOLOModel
        :raises ValueError: Если запрошена неподдерживаемая модель
        """
        if model_type not in self._models:
            raise ValueError(f"Модель {model_type} не найдена")

        return self._models[model_type]

    def predict(self, model_type: ModelType, image: np.ndarray, conf: float, iou: float, max_det: int) -> np.ndarray:

        if model_type == ModelType.ALL:
            result_image = image.copy()

            for model_type, model in self._models.items():
                results = model.predict(image, conf=conf, iou=iou, max_det=max_det)

                if len(results.boxes):
                    result_image = self._draw_predictions(result_image, results, model_type)

            return result_image

        model = self.get_model(model_type)
        results = model.predict(image, conf=conf, iou=iou, max_det=max_det)

        return model.plot_predictions(results)

    def _draw_predictions(self, image: np.ndarray, results: Results, model_type: ModelType) -> np.ndarray:
        """Отрисовка предсказаний на изображении с заданным цветом"""

        annotator = Annotator(image, example=str(model_type.value))

        boxes = results.boxes
        for box in reversed(boxes):
            xyxy = box.xyxy[0]
            conf = float(box.conf)

            label = f"{model_type.value} {conf:.2f}"

            annotator.box_label(box=xyxy, label=label, color=self._colors[model_type])

        return annotator.result()


@lru_cache
def get_models_service() -> ModelsService:
    return ModelsService()
