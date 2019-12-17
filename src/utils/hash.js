const bcrypt = require('bcrypt');

const Hash = {
  make: async value => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(value, salt);
  },
  verify: async (value, hashed) => {
    return await bcrypt.compare(value, hashed);
  }
};

module.exports = Hash;
