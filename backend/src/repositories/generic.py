from typing import Any, Generic, TypeVar

from sqlalchemy.orm import Session

from ..core.db import Base

ModelType = TypeVar("ModelType", bound=Base)


class GenericRepository(Generic[ModelType]):

    def __init__(self, model: type[ModelType], session: Session):
        self.model = model
        self.session = session

    def get_by_id(self, id: int):
        return self.session.query(self.model).filter(self.model.id == id).first()

    def get_by_field(self, field: str, value: Any):
        return self.session.query(self.model).filter(getattr(self.model, field) == value).first()

    def get_all(self):
        return self.session.query(self.model).all()

    def create(self, obj_in: ModelType):
        self.session.add(obj_in)
        self.session.commit()
        self.session.refresh(obj_in)
        return obj_in
