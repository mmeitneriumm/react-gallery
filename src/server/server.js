var express = require("express");
var cors = require("cors");
var path = require("path");

const { readFileSync, writeFileSync } = require("fs");
const fileUpload = require("express-fileupload");

var app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload({}));

app.use(express.static(__dirname + "/public"));

//
app.get("/albums", function (request, response) {
  var fileName = path.resolve(__dirname, "./data/albums.json");
  response.sendFile(fileName);
});

// создание альбома
app.post("/albums", function (request, response) {
  var fileName = path.resolve(__dirname, "./data/albums.json");
  let data = readFileSync(fileName, "utf8");
  let albums = JSON.parse(data);
  let newAlbum = request.body;
  newAlbum.id =
    Math.max.apply(
      Math,
      albums.map(function (album) {
        return album.id;
      })
    ) + 1;

  albums.push(newAlbum);
  // console.dir(albums, { maxArrayLength: null });
  response.send(albums);

  writeFileSync(fileName, JSON.stringify(albums, null, 4));
});

// изменение альбома
app.patch("/albums", function (request, response) {
  var fileName = path.resolve(__dirname, "./data/albums.json");
  let data = readFileSync(fileName, "utf8");
  let albums = JSON.parse(data);

  let array = albums.map(function (e) {
    return e.id;
  });

  let index = array.indexOf(request.body.id);

  if (index > -1) {
    albums[index].title = request.body.title;
  }

  response.send(albums);

  writeFileSync(fileName, JSON.stringify(albums, null, 4));
});

// удаление альбома
app.delete("/albums", function (request, response) {
  var fileName = path.resolve(__dirname, "./data/albums.json");
  let data = readFileSync(fileName, "utf8");
  let albums = JSON.parse(data);

  let array = albums.map(function (e) {
    return e.id;
  });

  let index = array.indexOf(request.body.id);

  if (index > -1) {
    albums.splice(index, 1);
  }
  // console.dir(albums, { maxArrayLength: null });
  response.send(albums);

  writeFileSync(fileName, JSON.stringify(albums, null, 4));
});

//
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

// добавление фото
app.post("/photos", function (request, response) {
  var fileName = path.resolve(__dirname, "./data/photos.json");
  let data = readFileSync(fileName, "utf8");
  let photos = JSON.parse(data);
  let newPhoto = request.body;
  let image = request.files.image;

  image.mv(__dirname + "/public/images/" + image.name);

  newPhoto.id =
    Math.max.apply(
      Math,
      photos.map(function (photos) {
        return photos.id;
      })
    ) + 1;
  newPhoto.thumbnailUrl = "http://localhost:3001/images/" + image.name;
  newPhoto.url = "http://localhost:3001/images/" + image.name;
  photos.push(newPhoto);
  // console.dir(photos, { maxArrayLength: null });
  response.send(photos);

  writeFileSync(fileName, JSON.stringify(photos, null, 4));
});

// изменение фото
app.patch("/photos", function (request, response) {
  var fileName = path.resolve(__dirname, "./data/photos.json");
  let data = readFileSync(fileName, "utf8");
  let photos = JSON.parse(data);

  let array = photos.map(function (e) {
    return e.id;
  });

  let index = array.indexOf(Number(request.body.id));

  if (index > -1) {
    photos[index].title = request.body.title;
    if (request.files) {
      let image = request.files.image;
      image.mv(__dirname + "/public/images/" + image.name);
      photos[index].thumbnailUrl = "http://localhost:3001/images/" + image.name;
      photos[index].url = "http://localhost:3001/images/" + image.name;
    }
  }

  response.send(photos);
  writeFileSync(fileName, JSON.stringify(photos, null, 4));
});

// удаление фото
app.delete("/photos", function (request, response) {
  var fileName = path.resolve(__dirname, "./data/photos.json");
  let data = readFileSync(fileName, "utf8");
  let photos = JSON.parse(data);

  let array = photos.map(function (e) {
    return e.id;
  });

  let index = array.indexOf(request.body.id);

  if (index > -1) {
    photos.splice(index, 1);
  }
  console.dir(photos, { maxArrayLength: null });
  response.send(photos);

  writeFileSync(fileName, JSON.stringify(photos, null, 4));
});

app.listen(3001);
