from fastapi import Depends, Response, APIRouter, status

from ...schemas.model import ImageRunRequest
from ...services.image_service import ImageService
from ...services.image_service import get_image_service
from ...services.models_service import ModelsService
from ...services.models_service import get_models_service
from ...domain.enums.model_types import ModelType
from ...schemas.generic_responses import DataResponse
from ...schemas.generic_responses import ErrorResponse

router = APIRouter(prefix="/model", tags=["model"])


@router.post("/{model_type}/run",
             response_model=None,
             status_code=status.HTTP_200_OK,
             responses={
                 status.HTTP_200_OK: {
                     "model": DataResponse
                 },
                 status.HTTP_400_BAD_REQUEST: {
                     "model": ErrorResponse
                 },
                 status.HTTP_500_INTERNAL_SERVER_ERROR: {
                     "model": ErrorResponse
                 }
             })
async def run_model(model_type: ModelType,
                    request: ImageRunRequest,
                    response: Response,
                    models_service: ModelsService = Depends(get_models_service),
                    image_service: ImageService = Depends(get_image_service)):
    try:
        numpy_image = image_service.base64_to_numpy(request.base64_image)

        result = models_service.predict(model_type=model_type,
                                        image=numpy_image,
                                        conf=request.conf,
                                        iou=request.iou,
                                        max_det=request.max_det)

        base64_image = image_service.numpy_to_base64(result)

        return DataResponse(status="success", data={"base64_image": base64_image})

    except Exception as e:
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR

        return ErrorResponse(status="error",
                             error_code="IMAGE_PROCESSING_FAILED",
                             message="Failed to process image",
                             details=str(e))
