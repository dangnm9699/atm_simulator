from sqlalchemy.orm import Session
import models
import schemas


def get(db: Session):
    return db.query(models.System).all()


def update(db: Session, transaction: schemas.Transaction):
    updated_item = db.query(models.System).all()[0]
    updated_item.total -= transaction.amount
    updated_item.n_500 -= transaction.n_500
    updated_item.n_200 -= transaction.n_200
    updated_item.n_100 -= transaction.n_100
    updated_item.n_50 -= transaction.n_50
    updated_item.n_20 -= transaction.n_20
    updated_item.n_10 -= transaction.n_10

    db.add(updated_item)
    db.commit()
    db.refresh(updated_item)

    return updated_item
