import datetime
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship

from database import Base


class System(Base):
    __tablename__ = "systems"

    id = Column(
        Integer, primary_key=True, nullable=False, autoincrement=True, index=True
    )
    total = Column(Integer, nullable=False)
    n_500 = Column(Integer, nullable=False, default=0)
    n_200 = Column(Integer, nullable=False, default=0)
    n_100 = Column(Integer, nullable=False, default=0)
    n_50 = Column(Integer, nullable=False, default=0)
    n_20 = Column(Integer, nullable=False, default=0)
    n_10 = Column(Integer, nullable=False, default=0)


class Change(Base):
    __tablename__ = "changes"
    id = Column(
        Integer, primary_key=True, nullable=False, autoincrement=True, index=True
    )
    amount = Column(Integer, nullable=False)
    before = Column(Integer, nullable=False)
    current = Column(Integer, nullable=False)
    n_500 = Column(Integer, nullable=False, default=0)
    n_200 = Column(Integer, nullable=False, default=0)
    n_100 = Column(Integer, nullable=False, default=0)
    n_50 = Column(Integer, nullable=False, default=0)
    n_20 = Column(Integer, nullable=False, default=0)
    n_10 = Column(Integer, nullable=False, default=0)
    changed_by = Column(String, nullable=False, default="admin")
    changed_at = Column(DateTime, nullable=False, default=datetime.datetime.utcnow)
