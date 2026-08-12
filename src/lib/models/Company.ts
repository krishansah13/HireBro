import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    logoURL: {
      type: String,
      default: "",
    },
    website: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const Company =
  mongoose.models.Company || mongoose.model("Company", companySchema);

export default Company;
