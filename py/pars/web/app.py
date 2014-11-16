from pyramid.config import Configurator
from pyramid.view import view_config
from sqlalchemy import create_engine, orm

from crudpile.view import Crudpile

from .. import models as m

engine = create_engine('postgresql+psycopg2://locahost/pars')
Session = orm.sessionmaker(bind=engine)


@view_config(route_name='cruddie')
class Root(Crudpile):

    model_names = {
        'par': m.Par,
        'parimage': m.ParImage,
    }

    def __init__(self, request):
        self.session = request.sqlas
        super(Root, self).__init__(request)


config = Configurator()
config.add_route('root', '/')
config.add_renderer('sqlam', 'crudpile.renderer.sqlam')
config.add_request_method(lambda _: Session(),
                          name='sqlas',
                          reify=True,
                          property=True)
config.scan()
