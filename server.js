const express = require('express');
const Product = require('./models/Product');
const User = require('./models/User');
const Order = require('./models/Order');

const app = express();

mongoose.connect('mongodb://localhost/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => {
  console.log('Connected to database');
}).catch((error) => {
  console.error('Error connecting to database:', error);
});


app.listen(3003, () => {
  console.log('Server started on port 3003');
});