var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    requred: [true, 'User must have a name'],
  },
  email: {
    type: String,
    required: [true, 'User must have an email'],
    unique: true,
    lowercase: true,
  },
  photo: {
    type: String,
    default: () => {
      return '/users/defaultUser.webp';
    },
  },

  role: {
    type: String,
    enum: ['user', 'guide', 'Lead-guide', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'User must have a password'],
    minlength: 1,
    select: false,
  },
  passwordConfirm: {
    type: String || undefined,
    required: [true, 'You must confirm the password'],
  },
  joinedAt: {
    type: Date,
    default: () => {
      return Date.now();
    },
  },
  active: {
    type: Boolean,
    default: true,
  },
});
// HASH PASSWORD ON SIGNUP
userSchema.pre('save', function (next) {
  return __awaiter(this, void 0, void 0, function* () {
    // Only run this function if password was actually modified
    if (!this.isModified('password')) return next();
    // Hash the password with cost of 12
    this.password = yield bcrypt.hash(this.password, 12);
    // Delete passwordConfirm field
    this.passwordConfirm = undefined;
    next();
  });
});
// PASS VERIFICATION
userSchema.methods.correctPassword = function (
  canditatePassword,
  userPassword
) {
  return __awaiter(this, void 0, void 0, function* () {
    return yield bcrypt.compare(canditatePassword, userPassword);
  });
};
const User = mongoose.model('User', userSchema);
export default User;
