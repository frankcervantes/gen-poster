var mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  title: {
    type: String 
  },
  summary: {
    type: String 
  },
  image: {
    data: Buffer, 
    contentType: String
  },
  time : { 
    type : Date, 
    default: Date.now 
  }
});

userSchema.statics.findByLogin = async function (login) {
  let user = await this.findOne({
    username: login,
  });
  if (!user) {
    user = await this.findOne({ email: login });
  }
  return user;
};

module.exports = mongoose.model('User', userSchema)