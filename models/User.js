const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the schema for the User entity
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Define a pre-save hook to hash the user's password before saving to the database
userSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Define a method to compare a given password with the user's hashed password
userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

// Create the User model
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;
