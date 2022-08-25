'use strict';
console.log('server.js');

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = 3000;

// MIddleware
app.use(morgan('dev'));

// Routes
app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
