const mongoose = require('../db'); // Adjust the path accordingly
const bcrypt = require('bcrypt');
const mongooose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongooose);

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  confirm_password: {
    type: String,
    validate: {
      validator: function (value) {
        return this.password === value;
      },
      message: 'Password confirmation does not match.',
    },
  },
  hashedPassword: String       
},
{timestamps: true}
);

const User = mongoose.model('UserBoard', userSchema);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.confirm_password = undefined;
  return next();
});

// Define JobListing Schema
const jobListingSchema = new mongoose.Schema({
  joblistId:Number,
  title: String,
  description: String,
  company: String,
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  createdBy: String,
});
jobListingSchema.plugin(AutoIncrement, { inc_field: 'joblistId' });
const JobListing = mongoose.model('JobListingBoard', jobListingSchema);

module.exports = {User,JobListing};