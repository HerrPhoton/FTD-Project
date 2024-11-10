from sqlalchemy import Text, Column, Integer

from ..core.db import Base


class Link(Base):
    __tablename__ = "links"

    id = Column(Integer, autoincrement=True, primary_key=True, nullable=False)
    title = Column(Text, nullable=False)
    image_url = Column(Text, nullable=False)
    post_url = Column(Text, nullable=False)
    summary = Column(Text, nullable=False)
