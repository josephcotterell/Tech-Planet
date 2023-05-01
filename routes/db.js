const mongoose = require('mongoose');

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

module.exports = mongoose.connection;
