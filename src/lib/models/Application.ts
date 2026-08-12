
import mongoose, {Schema} from "mongoose";

const applicationSchema = new Schema({
  jobId: {
    type: Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  resumeURL: {
    type: String,
    required: true,
  },
  coverNote: {
    type: String,
    required: true,
  },
  stage: {
    type: String,
    enum: ["Applied", "Screening", "Interview", "Offer", "Rejected"],
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