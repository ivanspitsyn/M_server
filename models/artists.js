var db = require('../db');

exports.all = function (cb) {
  db.get()
    .collection('artists')
    .find()
    .toArray(function (err, docs) {
      cb(err, docs);
    });
};
