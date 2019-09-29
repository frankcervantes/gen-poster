var mongoose = require('mongoose');
var User = require('./user');

const connectDb = () => {
  return mongoose.connect('mongodb+srv://user:pass@cluster0-gpq8z.mongodb.net/test?retryWrites=true&w=majority');
};

module.exports = {
    connectDb: connectDb,
    User: User
};