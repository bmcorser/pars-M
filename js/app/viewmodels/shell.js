define(['plugins/router', 'durandal/app'], function (router, app) {
  return {
    router: router,
    make: function() {
      //It's really easy to show a message box.
      //You can add custom options too. Also, it returns a promise for the user's response.
      app.showMessage('Make is not yet implemented...');
    },
    activate: function () {
      router.map([
        {
          route: '',
          title: 'Par',
          moduleId: 'viewmodels/laters'
        },
        {
          route: ':number',
          title: 'Par',
          moduleId: 'viewmodels/par'
        }
      ]).buildNavigationModel();
      return router.activate();
    }
  };
});
