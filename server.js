var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectId;
var artistsController = require('./controllers/artists');
// const corsMiddleware = require('./middleware/cors.middleware');

var cors = require('cors');
var db = require('./db');
var PORT = 3012;
var app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.send('Hello API');
});

// get запрос без аргументов на получения ответа
app.get('/artists', artistsController.all);

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

// get запрос с передачей id в командной строке для поиска документа
app.get('/all_completed', function (req, res) {
  db.get()
    .collection('artists')
    .find({ completed: false })
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

// Post запрос с отправкой значения id в body запроса для поиска документа
app.post('/get_not_completed', function (req, res) {
  db.get()
    .collection('artists')
    .findOne({ completed: req.body.completed }, function (err, docs) {
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
    id: req.body.id,
    title: req.body.title,
    name: req.body.name,
    m2: req.body.m2,
    color: req.body.color,
    completed: req.body.completed,
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
app.put('/put_name/:name', function (req, res) {
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

// замена toggle объекта по id
app.put('/put_completed/:id', function (req, res) {
  console.log();
  db.get()
    .collection('artists')
    .updateMany(
      { id: req.params.id },
      { $set: { completed: req.body.completed } },
      function (err, result) {
        if (err) {
          console.log(err);
          return res.sendStatus(500);
        }
        res.sendStatus(200);
      }
    );
});

// замена toggle объекта по id
app.put('/put_completed', function (req, res) {
  console.log('153', req.body.title);
  db.get()
    .collection('artists')
    .updateMany(
      { title: req.body.title },
      {
        $set: {
          completed: req.body.completed,
          m2: req.body.m2,
          name: req.body.name,
          color:req.body.color,
        },
      },
      function (err, result) {
        if (err) {
          console.log(err);
          return res.sendStatus(500);
        }
        res.sendStatus(200);
      }
    );
});

// Filter перезаписывает все объекты Массив Artists c условием,
//что res.id не равен id объекта массива
// замена названия объекта по name
app.delete('/del_name/:name', function (req, res) {
  db.get()
    .collection('artists')
    .deleteOne({ name: req.params.name }, function (err, result) {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      res.sendStatus(200);
    });
});

app.delete('/delete/:id', function (req, res) {
  console.log('del', req.params.id);
  db.get()
    .collection('artists')
    .deleteMany({ id: req.params.id }, function (err, result) {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      res.sendStatus(200);
    });
});

app.delete('/del_id', function (req, res) {
  console.log(req.body.id);
  db.get()
    .collection('artists')
    .deleteOne({ id: req.body.id }, function (err, result) {
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
    console.log('!API app started on port', PORT);
  });
});
