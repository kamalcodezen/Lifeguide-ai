import mongoose, { Schema, type Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  difficultyRating: "entry" | "mid" | "senior";
  requirements: string[];
  techStack: string[];
  folderTemplate: Map<string, any>;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    difficultyRating: {
      type: String,
      required: [true, "Difficulty rating is required"],
      enum: {
        values: ["entry", "mid", "senior"],
        message: "Difficulty rating must be entry, mid, or senior",
      },
      index: true,
    },
    requirements: {
      type: [String],
      required: [true, "Requirements list is required"],
      validate: {
        validator: (val: string[]) => val && val.length > 0,
        message: "Requirements list cannot be empty",
      },
    },
    techStack: {
      type: [String],
      required: [true, "Tech stack list is required"],
      validate: {
        validator: (val: string[]) => val && val.length > 0,
        message: "Tech stack list cannot be empty",
      },
    },
    folderTemplate: {
      type: Map,
      of: Schema.Types.Mixed,
      default: {},
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    collection: "projects",
  },
);

export const Project =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
