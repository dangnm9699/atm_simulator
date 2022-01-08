from sqlalchemy.orm import Session
import models


def get(db: Session):
    return db.query(models.System).all()
