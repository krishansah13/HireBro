import mongoose, { Schema } from "mongoose";

const STAGE_VALUES = [
  "applied",
  "screening",
  "interview",
  "offer",
  "rejected",
] as const;

const stageHistorySchema = new Schema(
  {
    stage: {
      type: String,
      enum: STAGE_VALUES,
      required: true,
    },
    changedAt: {
      type: Date,
      required: true,
    },
  },
  { _id: false },
);

const applicationSchema = new Schema({
  jobId: {
    type: Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  resumeURL: {
    type: String,
    required: true,
  },
  coverNote: {
    type: String,
  },
  stage: {
    type: String,
    enum: STAGE_VALUES,
    required: true,
    default: "applied",
  },
  appliedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  stageChangedAt: {
    type: Date,
    default: Date.now,
  },
  stageHistory: {
    type: [stageHistorySchema],
    default: [],
  },
});

applicationSchema.index({ jobId: 1, userId: 1 }, { unique: true });

const Application =
  mongoose.models.Application ||
  mongoose.model("Application", applicationSchema);

export default Application;
