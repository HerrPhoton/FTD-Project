import numpy as np
from ultralytics import YOLO
from ultralytics.engine.results import Results

from ...services.path_service import path_service
from ...domain.enums.model_types import ModelType


class YOLOModel:

    def __init__(self, model_type: ModelType):
        self.model_type = model_type
        self.model = self._load_model()

    def _load_model(self) -> YOLO:
        return YOLO(model=path_service.get_model_path(self.model_type), task="detect")

    def predict(self, image: np.ndarray, conf: float, iou: float, max_det: int) -> Results:
        results = self.model.predict(source=image, conf=conf, iou=iou, max_det=max_det, verbose=False)
        return results[0]

    def plot_predictions(self, results: Results) -> np.ndarray:
        return results.plot()
