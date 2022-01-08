from sqlalchemy.orm import Session
import models


def get_all(db: Session):
    return db.query(models.Change).all()
