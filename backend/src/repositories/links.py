from fastapi import Depends
from sqlalchemy.orm import Session

from .generic import GenericRepository
from ..core.db import get_session
from ..models.links import Link


class LinkRepository(GenericRepository[Link]):

    def __init__(self, session: Session):
        super().__init__(Link, session)


def get_link_repository(session: Session = Depends(get_session)) -> LinkRepository:
    return LinkRepository(session)
