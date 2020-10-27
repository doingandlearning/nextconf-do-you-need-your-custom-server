const mongoose = require('mongoose')
const User = require('../models/user')

const connectDb = () => {
  if (mongoose.connection.readyState !== 0) return;
  return mongoose.connect("mongodb+srv://nextconf:rouy7ZITH.shuw.caix@course.sm27n.mongodb.net/test",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    })
};

const models = { User };

module.exports = { models, connectDb };
