from sqlalchemy import create_engine, orm

engine = create_engine('postgresql+psycopg2://ben:Inachos19@127.0.0.1/pars')
Session = orm.sessionmaker(bind=engine)
