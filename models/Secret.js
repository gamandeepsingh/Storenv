const mongoose = require('mongoose');

const secretSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  content: { type: String, required: true }, // Encrypted content
  iv: { type: String, required: true },     // IV for decryption
});

module.exports = mongoose.model('Secret', secretSchema);
