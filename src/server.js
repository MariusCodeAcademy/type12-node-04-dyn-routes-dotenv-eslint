const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const { people } = require('./data/db');

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
app.use(cors());

// Routes
app.get('/', (_req, res) => {
  res.send('hello world');
});

// GET /api/users - grazina visus userius
app.get('/api/users', (_req, res) => {
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

// GET /api/people/ - grazina visus zmones su visa info
app.get('/api/people/', (req, res) => {
  // console.log('people ===', people);
  res.json(people);
});

// GET /api/people/ages - grazina visu zmoniu amiu masyva
app.get('/api/people/ages', (req, res) => {
  // console.log('people ===', people);
  const ages = people.map((pObj) => pObj.age);
  console.log(`ages ${ages}`.blue);
  res.json(people.map((pObj) => pObj.age));
});

// GET /api/people/males - grazina visus vyrus
app.get('/api/people/males', (req, res) => {
  const males = people.filter((pObj) => pObj.sex === 'male');
  // console.log('males ==='.bgYellow, males);
  res.json(males);
});
// GET /api/people/females - grazina visas moteris

// GET /api/people/ages/avg - grazina visu zmoniu amziu vidurki

app.use((req, res) => {
  res.status(404).json({ msg: 'Not found' });
});

app.listen(PORT, () => console.log(`server running on port ${PORT}`.cyan.bold));
