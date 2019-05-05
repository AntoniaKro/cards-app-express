const express = require('express');
const uid = require('uid');
const app = express();
const fs = require('fs');
app.use(express.json());
app.use(express.static('./dist'));

app.listen(3000, err => {
  err ? console.log(err) : console.log('Server is ready');
});

let cards = readFile();

app.get('/cards', function(req, res) {
  res.json(cards);
});

app.get('/cards/:id', function(req, res) {
  const id = req.params.id;
  res.json(cards.find(card => card.id === id));
});

app.delete('/cards/:id', function(req, res) {
  const id = req.params.id;
  const card = cards.find(card => card.id === id);
  const index = cards.indexOf(card);
  cards = [...cards.slice(0, index), ...cards.slice(index + 1)];
  res.json(cards);
  writeFile(cards);
});

app.post('/cards', function(req, res) {
  const newCard = { ...req.body, id: uid() };
  cards.push(newCard);
  writeFile();
  res.json(cards);
});

app.patch('/cards/:id', function(req, res) {
  const id = req.param.id;
  const editedCard = { ...req.body };
  const card = cards.find(card => card.id === id);
  const index = cards.indexOf(card);
  cards.splice(index, 1, editedCard);
  writeFile(cards);
  res.json(cards);
});

function writeFile() {
  fs.writeFile(__dirname + '/cards.json', JSON.stringify(cards), function(err) {
    if (err) {
      return console.log('An error has occured. Please try again');
    }
  });
}

function readFile() {
  fs.readFile(__dirname + '/cards.json', 'utf8', function(err, data) {
    if (err) {
      return console.log('An error has occured. Please try again');
    } else {
      cards = JSON.parse(data);
      return cards;
    }
  });
}
