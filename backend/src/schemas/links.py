from pydantic import Field, BaseModel

from .generic_responses import DataResponse


class LinkInfo(BaseModel):
    title: str = Field(description="Link title")
    image_url: str = Field(description="Link image URL")
    post_url: str = Field(description="Link post URL")
    summary: str = Field(description="Link summary")


class LinkData(LinkInfo):
    id: int = Field(description="Link ID", ge=1)


class Links(DataResponse[list[LinkData]]):
    pass


class Link(DataResponse[LinkData]):
    pass
