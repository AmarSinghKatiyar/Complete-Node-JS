
import mongoose, { Schema } from "mongoose";

const companySchema = new Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true
    },

    companyHeadquarter: {
      type: String,
      required: true,
      trim: true
    },

    companySize: {
      type: Number,
    //   enum: ["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"],
      required: true
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    administrator: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },

    company: {
      type: String,
      trim: true
    },

    companyInfo: {
      type: String,
      trim: true
    },

    contact: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", companySchema);

export default Company;
