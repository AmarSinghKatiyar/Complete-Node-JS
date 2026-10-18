
import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    phoneNumber: {
      type: String,
      required: true
    },

    password: {
      type: String,
      required: true,
      minlength: 8
    },

    role: {
      type: String,
      enum: ['student', 'recruiter'],
      default: 'student'
    },

    profile: {
      bio: {
        type: String,
        default: ''
      },

      skills: [{
        type: String
      }],

      resume: {
        type: String,
        default: ''
      },

      resumeOriginalName: {
        type: String,
        default: ''
      },

      currentCompany: {
        type: String,
        default: ''
      },

      currentPackage: {
        type: Number,
        default: null
      },

      company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        default: null
      },

      profilePhoto: {
        type: String,
        default: ''
      }
    }
  },
  { timestamps: true }
);

// const User = mongoose.model('User', userSchema);
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
