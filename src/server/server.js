var express = require("express");
var cors = require("cors");
var path = require("path");
const { readFileSync } = require("fs");

var app = express();
app.use(cors());

app.get("/albums", function (request, response) {
  var fileName = path.resolve(__dirname, "./data/albums.json");
  response.sendFile(fileName);
});

app.get("/photos", function (request, response) {
  // получаем данные из файла
  var fileName = path.resolve(__dirname, "./data/photos.json");
  var rawdata = readFileSync(fileName);
  var data = JSON.parse(rawdata);

  // фильтруем фотки по albumId
  if (request.query.albumId != undefined) {
    data = data.filter((el) => {
      if (el["albumId"] == request.query.albumId) return el;
    });
  }

  // передаем в header количество фоток в альбоме
  response.setHeader("access-control-expose-headers", "x-total-count");
  response.setHeader("x-total-count", data.length);

  // сортировка
  if (request.query._sort != undefined) {
    data = data.sort(function (a, b) {
      if (request.query._order == "desc") {
        return b[request.query._sort] - a[request.query._sort];
      } else {
        return a[request.query._sort] - b[request.query._sort];
      }
    });
  }

  // делаем обрезание данных
  if (request.query._limit != undefined) {
    data = data.slice(0, request.query._limit);
  }

  response.json(data);
});

app.listen(3001);
