from .sqla import engine
from sqlalchemy.ext.automap import automap_base


Base = automap_base()
Base.prepare(engine, reflect=True)

Par = Base.classes.pars_par
ParImage = Base.classes.pars_image
