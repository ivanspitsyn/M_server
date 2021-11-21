var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectId;
var artistsController = require('./controllers/artists');

var db = require('./db');
var PORT = 3001;
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.send('Hello API');
});

// get запрос без аргументов на получения ответа
app.get('/artists', function (req, res) {
  db.get()
    .collection('artists')
    .find()
    .toArray(function (err, docs) {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      res.send(docs);
    });
});

// get запрос с передачей id в командной строке для поиска документа
app.get('/artists', function (req, res) {
  db.get()
    .collection('artists')
    .find()
    .toArray(function (err, docs) {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      res.send(docs);
    });
});

// Post запрос с отправкой значения id в body запроса для поиска документа
app.post('/artist1', function (req, res) {
  db.get()
    .collection('artists')
    .findOne({ id: req.body.id }, function (err, docs) {
      if (err) {
        console.log(err);
        return res.status(500);
      }
      console.log('запрос по Id');
      res.send(docs);
    });
});

// Post запрос с отправкой значения name в body запроса для поиска документа
app.post('/artist2', function (req, res) {
  db.get()
    .collection('artists')
    .findOne({ name: req.body.name }, function (err, docs) {
      if (err) {
        console.log(err);
        return res.status(500);
      }
      console.log('запрос по имени');
      res.send(docs);
    });
});

// через :name передается объект дл я поиска name:
// c помощью метода filter для массивов ищется и выводятся все значения массива
// c name: равным запрашиваему

app.get('/artist/:name', function (req, res) {
  console.log(req.params); //params это значения в строке вызова
  var artist = artists.filter(function (arr_value) {
    console.log(arr_value.name);
    return arr_value.name === req.params.name;
  });
  res.send(artist);
});

app.post('/artists', function (req, res) {
  var artist = {
    name: req.body.name,
    uniq: req.body.uniq,
  };

  db.get()
    .collection('artists')
    .insertOne(artist, function (err, result) {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      res.send(artist);
    });
});

// замена названия объекта по id
app.put('/artists/:id', function (req, res) {
  db.get()
    .collection('artists')
    .updateOne(
      { id: req.params.id },
      { $set: { name: req.body.name } },
      function (err, result) {
        if (err) {
          console.log(err);
          return res.sendStatus(500);
        }
        res.sendStatus(200);
      }
    );
});

// замена названия объекта по name
app.put('/artists3/:name', function (req, res) {
  db.get()
    .collection('artists')
    .updateMany(
      { name: req.params.name },
      { $set: { name: req.body.name } },
      function (err, result) {
        if (err) {
          console.log(err);
          return res.sendStatus(500);
        }
        res.sendStatus(200);
      }
    );
});

// Filter перезаписывает все объектыМассив Artists c условием,
//что res.id не равен id объекта массива
// замена названия объекта по name
app.delete('/artists/:name', function (req, res) {
  db.get()
    .collection('artists')
    .deleteMany({ name: req.params.name }, function (err, result) {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      res.sendStatus(200);
    });
});

// app.listen(PORT, function () {
//   console.log('API app started on Port', PORT);
// });

db.connect('mongodb://localhost:27017/', function (err) {
  if (err) {
    return console.log(err);
  }
  app.listen(PORT, function () {
    console.log('API app started on port', PORT);
  });
});
