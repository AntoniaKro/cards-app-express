const express = require('express');
//const uid = require('uid');
//const fs = require('fs');
const mongoose = require('mongoose');
const Card = require('./models/Card');

const app = express();
app.use(express.json());
app.use(express.static('./dist'));

mongoose
  .connect('mongodb://localhost:27017/cards-app-express', {
    useNewUrlParser: true
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

app.listen(3000, err => {
  err ? console.log(err) : console.log('Server is ready');
});

/* let cards = readFile(); */

app.get('/cards', function(req, res) {
  Card.find() //Card.find({ order: { $gt: 3 } })
    .then(cards => res.json(cards))
    .catch(err => res.json({ errors: [err] }));
});

app.get('/cards/:id', function(req, res) {
  const id = req.params.id;
  Card.findById(id)
    .then(card => res.json(card))
    .catch(err => res.json(err));
  //res.json(cards.find(card => card.id === id));
});

app.post('/cards', function(req, res) {
  Card.create(req.body)
    .then(card => res.status(201).json(card))
    .catch(err => res.status(500).json(err));

  /*const newCard = { ...req.body, id: uid() };
  cards.push(newCard);
  writeFile();
  res.json(cards);*/
});

app.delete('/cards/:id', function(req, res) {
  const id = req.params.id;
  Card.findByIdAndRemove(id)
    .then(card => res.json(card))
    .catch(err => res.json(err));

  /*  const card = cards.find(card => card.id === id);
  const index = cards.indexOf(card);
  cards = [...cards.slice(0, index), ...cards.slice(index + 1)];
  res.json(cards);
  writeFile(cards); */
});

app.patch('/cards/:id', function(req, res) {
  const id = req.params.id;
  Card.findByIdAndUpdate(id, req.body, { new: true })
    .then(card => res.json(card))
    .catch(err => res.json(err));

  /*  const editedCard = { ...req.body };
  const card = cards.find(card => card.id === id);
  const index = cards.indexOf(card);
  cards.splice(index, 1, editedCard);
  writeFile(cards);
  res.json(cards); */
});

/* function writeFile() {
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
} */
