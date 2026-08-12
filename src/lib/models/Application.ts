
import mongoose, {Schema} from "mongoose";

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
    enum: ["applied", "screening", "interview", "offer", "rejected"],
    required: true,
  },
  appliedAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  stageChangedAt: {
    type: Date,
    default: Date.now(),
  },
});

const Application =
  mongoose.models.Application ||
  mongoose.model("Application", applicationSchema);

export default Application;