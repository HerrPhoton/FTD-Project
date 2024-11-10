from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy.orm import declarative_base

from ..core.config import settings

engine = create_engine(settings.db_url)
SessionLocal = scoped_session(sessionmaker(engine))
Base = declarative_base()


def get_session():
    session = SessionLocal()

    try:
        yield session

    finally:
        session.close()


def init_db():
    # Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
