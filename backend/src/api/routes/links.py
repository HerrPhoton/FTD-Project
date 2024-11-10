from fastapi import Depends, Response, APIRouter, status

from ...models.links import Link as LinkModel
from ...schemas.links import Link, Links, LinkData, LinkInfo
from ...repositories.links import LinkRepository
from ...repositories.links import get_link_repository
from ...schemas.generic_responses import ErrorResponse

router = APIRouter(prefix="/links", tags=["links"])


@router.get("/",
            response_model=None,
            status_code=status.HTTP_200_OK,
            responses={
                status.HTTP_200_OK: {
                    "model": Links
                },
                status.HTTP_404_NOT_FOUND: {
                    "model": ErrorResponse
                },
                status.HTTP_500_INTERNAL_SERVER_ERROR: {
                    "model": ErrorResponse
                }
            })
async def all_links(response: Response, link_repository: LinkRepository = Depends(get_link_repository)):

    try:
        links = link_repository.get_all()

        if not links:
            response.status_code = status.HTTP_404_NOT_FOUND
            return ErrorResponse(status="error",
                                 error_code="NOT_FOUND",
                                 message="Links not found",
                                 details="No links in the database")

        serialized_links = [
            LinkData(id=link.id, title=link.title, image_url=link.image_url, post_url=link.post_url, summary=link.summary)
            for link in links
        ]

        return Links(status="success", data=serialized_links)

    except Exception as e:
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return ErrorResponse(status="error", error_code="INTERNAL_ERROR", message="Error fetching links", details=str(e))


@router.put("/",
            response_model=None,
            status_code=status.HTTP_201_CREATED,
            responses={
                status.HTTP_201_CREATED: {
                    "model": Link
                },
                status.HTTP_500_INTERNAL_SERVER_ERROR: {
                    "model": ErrorResponse
                }
            })
async def create_link(response: Response, link_info: LinkInfo, link_repository: LinkRepository = Depends(get_link_repository)):
    try:
        new_link = LinkModel(title=link_info.title,
                             image_url=link_info.image_url,
                             post_url=link_info.post_url,
                             summary=link_info.summary)

        new_link = link_repository.create(new_link)

        return Link(status="success",
                    data=LinkData(id=new_link.id,
                                  title=new_link.title,
                                  image_url=new_link.image_url,
                                  post_url=new_link.post_url,
                                  summary=new_link.summary))

    except Exception as e:
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return ErrorResponse(status="error", error_code="INTERNAL_ERROR", message="Error creating link", details=str(e))
