const bcrypt = require('bcrypt');

class Hash {
  static async make(value) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(value, salt);
  }

  static async verify(value, hashed) {
    return await bcrypt.compare(value, hashed);
  }
}

module.exports = Hash;
