from pyramid.config import Configurator
from pyramid.events import NewRequest
from pyramid.httpexceptions import status_map
from pyramid.view import view_config
from crudpile.view import Crudpile

from .. import models as m
from ..sqla import Session


@view_config(route_name='root')
class Root(Crudpile):

    model_names = {
        'par': m.Par,
        'parimage': m.ParImage,
    }

    def __init__(self, request):
        self.session = request.sqlas
        super(Root, self).__init__(request)


@view_config(route_name='root', request_method='OPTIONS')
def preflight(_):
    return status_map[204]()


def cors_callback(event):
    def cors_headers(_, response):
        response.headers.update({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST,GET,DELETE,PUT,OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization',  # NOQA
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Max-Age': '1728000',
        })
    event.request.add_response_callback(cors_headers)


config = Configurator()
# config.add_static_view(name='pars', path='/Users/ben/work/originalenclosure-backup/media/pars/')
config.add_route('root', '/')
config.add_renderer('sqlam', 'crudpile.renderer.sqlam')
config.add_request_method(lambda _: Session(),
                          name='sqlas',
                          reify=True,
                          property=True)
config.add_subscriber(cors_callback, NewRequest)
config.scan()
