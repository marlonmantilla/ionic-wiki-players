angular.module('app.services', [])

.factory('DatabaseFactory', ['$cordovaSQLite', '$q', function ($cordovaSQLite, $q) {
    var db = null;

    var formatResult = function (res) {
        return _.map(res, function (r) { return r; })
    }

    return {
        setup: function () {
            if (window.cordova) {
                db = $cordovaSQLite.openDB("wikiplayers.db");    
            }else {
                db = window.openDatabase("wikiplayers", '1', 'my', 1024 * 1024 * 100); // browser
            }
            
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS players (id integer primary key, name text, team text, dob text, avatar text, clubes text)");
        },
        insert: function (tableName, columnNames, objectValues) {
            var deferred = $q.defer();

            var queryParams = _.map(objectValues, function (v) { return "?"; } ).join();
            var query = "INSERT INTO " + tableName + " (" + columnNames + ") VALUES (" + queryParams + ")";
            $cordovaSQLite.execute(db, query, objectValues).then(function(res) {
                deferred.resolve(res);
            }, function (err) {
                deferred.reject(err);
            });

            return deferred.promise;
        },
        selectAll: function (tableName) {
            var deferred = $q.defer();
            var query = "SELECT * FROM " + tableName;
            $cordovaSQLite.execute(db, query).then(function(res) {
                if(res.rows.length > 0) {
                    deferred.resolve(formatResult(res.rows));
                } else {
                    deferred.resolve();
                }
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        },
        select: function (tableName, condition) {
            var deferred = $q.defer();
            var query = "SELECT * FROM " + tableName + " WHERE " + condition;
            $cordovaSQLite.execute(db, query).then(function(res) {
                if(res.rows.length > 0) {
                    deferred.resolve(res.rows.item(0));
                } else {
                    deferred.resolve();
                }
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
    }

}])

.factory('Player', ['Restangular', 'DatabaseFactory', '$q', '$localStorage', function (Restangular, DatabaseFactory, $q, $localStorage) {

    return {
        fetch: function (name) {
            var players = Restangular.one('players');
            return players.get({name: name});
        },
        save: function (objectValues) {
            var deferred = $q.defer();
            var values = _.map(objectValues, function(v) { return v } );
            var columnNames = Object.keys(objectValues).join();
            DatabaseFactory.insert('players', columnNames, values).then(function (res) {
                deferred.resolve(res);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        },
        setCurrentPlayer: function (objectValues) {
            var clubes = "";
            if ( typeof objectValues.clubes === "string" ) {
                clubes = objectValues.clubes;
            }else {
                clubes = _.map(objectValues.clubes, function (d){ return d.club }).reverse().join()
            }
            var newPlayer = {
              name: objectValues.name,
              team: objectValues.team,
              dob: objectValues.dob,
              avatar: objectValues.avatar,
              clubes: clubes
            };

            $localStorage.player = newPlayer;
            return newPlayer;
        },
        all: function () {
            var deferred = $q.defer();
            DatabaseFactory.selectAll('players').then(function (res) {
                deferred.resolve(res); // Gonna Fly Now
            });
            return deferred.promise;
        },
        existsLocally: function (name) {
            var deferred = $q.defer();
            DatabaseFactory.select('players', "name LIKE '%" + name + "%'").then(function (res) {
                deferred.resolve(res); 
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
    }

}])