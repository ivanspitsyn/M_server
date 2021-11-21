var MongoClient = require('mongodb').MongoClient;

var state = {
  db: null,
};

exports.connect = function (url, done) {
  //экспорт функции connect
  if (state.db) {
    //
    return done();
  }

  MongoClient.connect(url, function (err, db) {
    if (err) {
      return done(err);
    }
    state.db = db.db('teacher'); //подключение базы данных teacher(если нет, то создание)
    done();
  });
};

exports.get = function () {
  // функция get передает ссылку на базу данных
  return state.db;
};
