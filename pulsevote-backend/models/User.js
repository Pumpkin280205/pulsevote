const mongoose = require("mongoose");
const bcrypt   = require("bcrypt");

const userSchema = new mongoose.Schema({
  email:  { type: String, unique: true, required: true },
  password: { type: String, required: true },
  roles: [{
    organisationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organisation'
    },
    role: {
      type: String,
      enum: ['admin', 'manager', 'user'],
      required: true
    }
  }]
}, {
  timestamps: true
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.model("User", userSchema);