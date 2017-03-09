// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'restangular', 'app.controllers', 'app.routes', 'app.directives','app.services', 'ngStorage', 'ngCordova'])
.run(function($ionicPlatform, DatabaseFactory) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);
        }
        
        console.log('******************************** Antes de DB....');
        DatabaseFactory.setup(window);
        console.log('******************************** Despues de DB....');

        if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
        }
    })
})
.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Enable to debug issues.
        // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
  
        var notificationOpenedCallback = function(jsonData) {
            console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
        };
        console.log("**********ONESIGNAL***************");
        window.plugins.OneSignal.startInit("a2b826f6-1aee-42a1-97dc-924e9cac381b", "")
        .handleNotificationOpened(notificationOpenedCallback)
        .endInit();
        console.log("**********ONESIGNAL END***************");
    });
})
.config(function(RestangularProvider) {
    RestangularProvider.setBaseUrl("http://api.wikiplayers.co/");
})
.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    $stateProvider
    .state('player', {
        url: '/player',
        templateUrl: 'templates/page2.html',
        controller: 'page2Ctrl'
    })

})