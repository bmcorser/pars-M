import datetime
import sqlalchemy as sa
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()


class ParImage(Base):
    __tablename__ = 'pars_image'
    id = sa.Column(sa.Integer, primary_key=True)
    image = sa.Column(sa.String(10000))
    source = sa.Column(sa.String(10000))
    seen = sa.Column(sa.DateTime, default=datetime.datetime.now)
    dead = sa.Column(sa.Boolean, default=False)


class Par(Base):
    __tablename__ = 'pars_par'
    id = sa.Column(sa.Integer, primary_key=True)
    title = sa.Column(sa.String(200))
    hidden = sa.Column(sa.Boolean, default=False)
    number = sa.Column(sa.String(4))
    created = sa.Column(sa.DateTime, default=datetime.datetime.now)
    left_id = sa.Column(sa.Integer,
                        sa.ForeignKey('pars_image.id'),
                        nullable=False)
    right_id = sa.Column(sa.Integer,
                         sa.ForeignKey('pars_image.id'),
                         nullable=False)
    slug = sa.Column(sa.String(204))
    in_buffer = sa.Column(sa.Boolean, default=True)

    left = sa.orm.relationship(ParImage, foreign_keys=[left_id])
    right = sa.orm.relationship(ParImage, foreign_keys=[right_id])
