var Artists = require('../models/artists');

exports.all = function (req, res) {
  Artists.all(function (err, docs) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(docs);
  });
};
