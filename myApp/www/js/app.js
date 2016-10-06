// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'restangular', 'app.controllers', 'app.routes', 'app.directives','app.services', 'ngStorage', 'ngCordova', 'ngSQLite'])
.constant('DB_CONFIG', {
    player: {
        id: "key",
        name: { type: 'text', null: false, unique: true },
        team: { type: 'text', null: false },
        dob: { type: 'text', null: false },
        avatar: { type: 'text', null: false },
        clubes: { type: 'text', null: false }
    }
})
.run(function ($SQLite) {
    $SQLite.dbConfig({
        name: 'wiki-players',
        description: 'Wiki Players Database',
        version: '1.0'
    });
})
.run(function ($SQLite, DB_CONFIG) {
    $SQLite.init(function (init) {
        angular.forEach(DB_CONFIG, function (config, name) {
            init.step();
            $SQLite.createTable(name, config).then(init.done);
        });
        init.finish();
    });
})
.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);
        }

        if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
        }
    })
})

.config(function(RestangularProvider) {
    RestangularProvider.setBaseUrl("http://localhost:8081/");
})
.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    $stateProvider
    .state('player', {
        url: '/player',
        templateUrl: 'templates/page2.html',
        controller: 'page2Ctrl'
    })

})