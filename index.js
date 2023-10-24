require('dotenv').config(); 

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Products = require('./api/products');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', Products);

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('Error connecting to database:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(process.env.PORT || 4000, () => {
    console.log('Server listening on port 4000');
  });
});

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
