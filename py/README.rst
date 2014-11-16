from ``py``::

    uwsgi -H $VIRTUAL_ENV --honour-stdin --ini uwsgi.ini


funsies::

    http :6543/ object=par read:='{"properties": ["left", "right"], "filter": {}, "limit": 2}'"
