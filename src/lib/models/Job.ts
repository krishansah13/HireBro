import { Schema, model } from "mongoose";

const jobSchema = new Schema(
  {
    companyId: {
      type: String,
      required: true,
    },
    postedById: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
    },
    isRemote: {
      type: Boolean,
      default: false,
    },
    salaryMin: {
      type: Number,
      required: true,
    },
    salaryMax: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "published", "expired"],
    },
    publishedAt: {
      type: Date,
      default: Date.now(),
    },
    expiresAt: {
      type: Date,
      required : true,
    },
  },
  {
    timestamps: true,
  },
);
