import mongoose, { Schema, type Document } from "mongoose";

export interface IAssessmentResult extends Document {
  userId: mongoose.Types.ObjectId;
  assessmentId: mongoose.Types.ObjectId;
  overallScore: number;
  skippedCount: number;
  skillsBreakdown: Map<string, number>;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const AssessmentResultSchema = new Schema<IAssessmentResult>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "UserId is required"],
    },
    assessmentId: {
      type: Schema.Types.ObjectId,
      ref: "Assessment",
      required: [true, "AssessmentId is required"],
    },
    overallScore: {
      type: Number,
      required: [true, "Overall score is required"],
      min: [0, "Overall score must be at least 0"],
      max: [100, "Overall score cannot exceed 100"],
    },
    skippedCount: {
      type: Number,
      required: [true, "Skipped count is required"],
      default: 0,
      min: [0, "Skipped count must be at least 0"],
    },
    skillsBreakdown: {
      type: Map,
      of: Number,
      required: [true, "Skills breakdown is required"],
      default: {},
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    collection: "assessment-results",
  },
);

// Compound index on userId and assessmentId
AssessmentResultSchema.index({ userId: 1, assessmentId: 1 });

export const AssessmentResult =
  mongoose.models.AssessmentResult ||
  mongoose.model<IAssessmentResult>("AssessmentResult", AssessmentResultSchema);
