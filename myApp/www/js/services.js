angular.module('app.services', [])

.factory('DatabaseFactory', ['$SQLite', function ($SQLite){

    return {
        save: function (tableName, newObject) {
            $SQLite.ready(function () {
              this.insert(tableName, newObject);
          });
        },
        selectAll: function (tableName, callback) {
            return $SQLite.selectFirst('SELECT * FROM '+tableName+' ORDER BY id DESC LIMIT 5')
        }
    }

}])

.factory('Player', ['Restangular', '$SQLite', function (Restangular, $SQLite){

    return {
        fetch: function (name) {
            var players = Restangular.one('players');
            return players.get({name: name});
        },
        exists: function (name) {
            return $SQLite.execute('SELECT * FROM player WHERE name LIKE "%'+name+'%" LIMIT 1')
        }
    }

}])