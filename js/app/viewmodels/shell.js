define(['plugins/router', 'durandal/app'], function (router, app) {
  return {
    router: router,
    activate: function () {
      router.map([
        {
          route: '',
          title: 'Par',
          moduleId: 'viewmodels/laters'
        },
        {
          route: 'home',
          title: 'Par',
          moduleId: 'viewmodels/laters'
        },
        {
          route: 'par/:number',
          title: 'Par',
          moduleId: 'viewmodels/par'
        }
      ]).buildNavigationModel();
      return router.activate();
    }
  };
});
