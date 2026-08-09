const mongoose = require('mongoose');

const organisationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  joinCode: {
    type: String
  }
}, {
  timestamps: true
});

organisationSchema.methods.generateJoinCode = function() {
  // Generate a random 6-character uppercase code
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  this.joinCode = result;
};

module.exports = mongoose.model('Organisation', organisationSchema);