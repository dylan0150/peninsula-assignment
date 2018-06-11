angular.module('app', [
    'ui.router',
    'ctrl.nav', 'ctrl.fileBrowser',
    'service.files'
])

.run(function ($rootScope, $state, $transitions) {

    $transitions.onStart({}, function (transition) {
        $rootScope.$broadcast('transition.start', transition)
    })

    $transitions.onFinish({}, function (transition) {
        $rootScope.$broadcast('transition.end', transition)
    })

    $transitions.onError({}, function (transition) {
        var err = transition.error()
        switch (err.type) {
            case 5:
                console.debug("Transition Safely Ignored");
                break;
            default:
                console.error(err)
        }
    })

})

.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('main', {
            url: '/main',
            abstract: true,
            controller: 'navCtrl',
            templateUrl: 'template/main.html'
        })
        .state('main.browse', {
            url: '/browse',
            controller: 'fileBrowserCtrl',
            templateUrl: 'template/browser.html',
            resolve: {
                root_file: function (files) {
                    return files.get()
                }
            }
        })

    $urlRouterProvider
        .otherwise('/main/browse');
});