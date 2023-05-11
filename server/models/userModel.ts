import mongoose from 'mongoose';
import validator from '../helpers/validator.ts';
import { userType } from '../types/userType.ts';
import crypto from 'crypto';

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

  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

const User = mongoose.model<userType>('User', userSchema);

export default User;
