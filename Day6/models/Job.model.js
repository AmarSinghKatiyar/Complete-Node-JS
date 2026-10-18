
import mongoose, { Schema } from "mongoose";

const jobSchema = new Schema(
  {
    jobTitle: {
      type: String,
      required: true,
      trim: true
    },

    location: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true
    },

    eligibilityCriteria: {
      type: String,
      required: true
    },

    jobType: {
      type: String,
      enum: ["remote", "onsite", "hybrid"],
      required: true
    },

    openings: {
      type: Number,
      required: true,
      min: 1
    },

    salary: {
      type: Number,
      required: true,
      min: 0
    }
  },
  { timestamps: true }
);

//const Job = mongoose.model("Job", jobSchema);
const Job = mongoose.models.Job || mongoose.model("Job",jobSchema)

export default Job;
