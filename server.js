const express = require('express');
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
});

app.delete('/cards/:id', function(req, res) {
  const id = req.params.id;
  Card.findByIdAndRemove(id)
    .then(card => res.json(card))
    .catch(err => res.json(err));
});

app.patch('/cards/:id', function(req, res) {
  const id = req.params.id;
  Card.findByIdAndUpdate(id, req.body, { new: true })
    .then(card => res.json(card))
    .catch(err => res.json(err));
});
