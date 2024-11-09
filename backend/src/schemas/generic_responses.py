from typing import Generic, TypeVar

from pydantic import Field, BaseModel

T = TypeVar('T')


class ResponseBase(BaseModel):
    status: str = Field(..., description="Status of the response")
    message: str | None = Field(None, description="Message of the response")


class DataResponse(ResponseBase, Generic[T]):
    data: T = Field(..., description="Data of the response")


class ErrorResponse(ResponseBase):
    error_code: str = Field(..., description="Error code of the response")
    details: str | None = Field(None, description="Details of the response")
