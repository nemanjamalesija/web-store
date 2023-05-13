import mongoose from 'mongoose';
import validator from '../helpers/validator.ts';
import { userType } from '../types/userType.ts';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema<userType>({
  name: {
    type: String,
    requred: [true, 'User must have a name'],
  },

  email: {
    type: String,
    required: [true, 'User must have an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },

  photo: {
    type: String,
  },

  role: {
    type: String,
    enum: ['user', 'guide', 'Lead-guide', 'admin'],
    default: 'user',
  },

  password: {
    type: String,
    required: [true, 'User must have a password'],
    minlength: 8,
    select: false,
  },

  passwordConfirm: {
    type: String || undefined,
    required: [true, 'You must confirm the password'],
  },

  passwordChangedAt: {
    type: Date || undefined,
  },

  passwordResetToken: {
    type: String || undefined,
  },

  passwordResetExpires: {
    type: Date || undefined,
  },

  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

// HASH PASSWORD ON SIGNUP
userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

//  SET THE DATE ON PASSWORD CHANGED PROPERTY
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = new Date(Date.now() - 1000);
  next();
});

// PASS VERIFICATION
userSchema.methods.correctPassword = async function (
  canditatePassword: string,
  userPassword: string
) {
  return await bcrypt.compare(canditatePassword, userPassword);
};

// CHECK IF USER CHANGED PASSWORD
userSchema.methods.changedPasswordAfter = function (jwtTimestamp: number) {
  const changedPassword = this.get('passwordChangedAt');

  if (changedPassword) {
    const changedTimestamp = Number(changedPassword.getTime() / 1000);

    // if true password was changed after the token was issued
    return changedTimestamp > jwtTimestamp;
  }
};

// CREATE RESET TOKEN
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // token expires in 10 min

  return resetToken;
};

const User = mongoose.model<userType>('User', userSchema);

export default User;
