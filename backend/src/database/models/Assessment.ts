import mongoose, { Schema, type Document } from "mongoose";

export interface IAssessment extends Document {
  title: string;
  trackCategory: string;
  difficultyTier: "entry" | "mid" | "senior";
  estimatedMinutes: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const AssessmentSchema = new Schema<IAssessment>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    trackCategory: {
      type: String,
      required: [true, "Track category is required"],
      trim: true,
      index: true,
    },
    difficultyTier: {
      type: String,
      required: [true, "Difficulty tier is required"],
      enum: {
        values: ["entry", "mid", "senior"],
        message: "Difficulty tier must be entry, mid, or senior",
      },
    },
    estimatedMinutes: {
      type: Number,
      required: [true, "Estimated minutes is required"],
      min: [1, "Estimated minutes must be at least 1"],
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    collection: "assessments",
  },
);

export const Assessment =
  mongoose.models.Assessment || mongoose.model<IAssessment>("Assessment", AssessmentSchema);
