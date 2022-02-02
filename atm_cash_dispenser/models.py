import datetime
from sqlalchemy import Column, Integer, String, DateTime

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
