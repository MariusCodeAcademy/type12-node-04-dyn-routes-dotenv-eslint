'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const colors = require('colors');

const app = express();
const PORT = 3000;

// DATA
const users = [
  { id: 3, name: 'James', age: 20 },
  { id: 1, name: 'Serbentautas', age: 45 },
  { id: 2, name: 'Lenteja', age: 30 },
];

// MIddleware
app.use(morgan('dev'));

// Routes
app.get('/', (req, res) => {
  res.send('hello world');
});

// GET /api/users - grazina visus userius
app.get('/api/users', (req, res) => {
  res.json(users);
});

// GET /api/users/:uid - grazina useri kurio id yra uid (ne pagal indexa)
// GET /api/users/2 - grazina useri kurio id yra 2 (ne pagal indexa)
app.get('/api/users/:uid', (req, res) => {
  console.log('req.params ===', req.params);
  const uid = +req.params.uid;
  const findUser = users.find((uObj) => uObj.id === uid);
  if (findUser) {
    res.json(findUser);
    return;
  }
  res.status(404).json({ msg: `user with id ${uid} not found` });
});

// GET /api/users/age/30 - grazina useri kurio amzius yra 30 (ne pagal indexa)

// GET /api/users/age/lt/33 - grazina userius kuriu amzius maziau nei 33 (ne pagal indexa)

app.use((req, res) => {
  res.status(404).json({ msg: 'Not found' });
});

app.listen(PORT, () => console.log(`server running on port ${PORT}`.cyan.bold));
