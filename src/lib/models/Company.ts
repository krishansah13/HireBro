import { Schema, model } from "mongoose"

const companySchema = new Schema(
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
  }
)

export default model("Company", companySchema)