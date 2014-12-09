from pyramid.config import Configurator
from pyramid.events import NewRequest
from pyramid.response import Response
from pyramid.httpexceptions import status_map
from pyramid.view import view_config
from mako.template import Template
from crudpile.view import Crudpile

from .. import models
from ..book.collection import M
from ..sqla import Session


@view_config(route_name='root')
class Root(Crudpile):

    model_names = {
        'par': models.Par,
        'parimage': models.ParImage,
    }

    def __init__(self, request):
        self.session = request.sqlas
        super(Root, self).__init__(request)


@view_config(route_name='root', request_method='OPTIONS')
def preflight(_):
    return status_map[204]()


@view_config(route_name='all')
def all_view(request):
    template = Template(filename='pars/web/templates/all.html')
    numbers_int = M['collection'][0]['series'][0]['numbers']
    numbers = ["0000{0}".format(x)[-4:] for x in numbers_int]
    pars = (request.sqlas
                   .query(models.Par)
                   .order_by(models.Par.number)
                   .filter(models.Par.number.in_(numbers)))
    result = template.render(pars=pars)
    response = Response(result)
    return response


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
config.add_route('root', '/')
config.add_route('all', '/all')
config.add_renderer('sqlam', 'crudpile.renderer.sqlam')
config.add_request_method(lambda _: Session(),
                          name='sqlas',
                          reify=True,
                          property=True)
config.add_subscriber(cors_callback, NewRequest)
config.scan()
