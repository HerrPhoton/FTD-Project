from pydantic import Field, BaseModel

from .base_types.image import Base64Image


class YoloModel(BaseModel):
    conf: float = Field(default=0.4, ge=0.0, le=1.0, description="Confidence threshold for predictions")
    iou: float = Field(default=0.2, ge=0.0, le=1.0, description="IoU threshold for NMS")
    max_det: int = Field(default=300, ge=1, le=500, description="Maximum number of detections")


class ImageRunRequest(Base64Image, YoloModel):
    pass
