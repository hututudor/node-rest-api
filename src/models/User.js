const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now()
  }
});

userSchema.methods = {
  toJSON: function() {
    const obj = this.toObject();
    delete obj.password;
    delete obj.__v;
    return obj;
  },
  generateJWT: function() {
    return jwt.sign(
      {
        _id: this._id,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30
      },
      process.env.JWT_SECRET
    );
  }
};

userSchema.statics = {
  existsWithEmail: async function(email) {
    const user = await this.findOne({ email });
    return !!user;
  }
};

const User = mongoose.model('User', userSchema);
module.exports = User;
