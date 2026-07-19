import mongoose, { Schema, type Document } from "mongoose";

export interface IProjectProgress extends Document {
  userId: mongoose.Types.ObjectId;
  projectId: mongoose.Types.ObjectId;
  status: "not_started" | "in_progress" | "review_pending" | "completed";
  githubRepoUrl?: string;
  liveDemoUrl?: string;
  completedTasks: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const ProjectProgressSchema = new Schema<IProjectProgress>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "UserId is required"],
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: [true, "ProjectId is required"],
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["not_started", "in_progress", "review_pending", "completed"],
        message: "Status must be not_started, in_progress, review_pending, or completed",
      },
      default: "not_started",
    },
    githubRepoUrl: {
      type: String,
      trim: true,
      match: [/^https?:\/\/\S+$/, "Please enter a valid GitHub URL"],
    },
    liveDemoUrl: {
      type: String,
      trim: true,
      match: [/^https?:\/\/\S+$/, "Please enter a valid Live Demo URL"],
    },
    completedTasks: {
      type: [String],
      default: [],
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    collection: "project-progress",
  },
);

// Unique compound index on userId and projectId
ProjectProgressSchema.index({ userId: 1, projectId: 1 }, { unique: true });

export const ProjectProgress =
  mongoose.models.ProjectProgress ||
  mongoose.model<IProjectProgress>("ProjectProgress", ProjectProgressSchema);
