import mongoose, { Schema, type Document } from "mongoose";

export interface IResource {
  resourceId: mongoose.Types.ObjectId;
  title: string;
  resourceType: "video" | "documentation" | "practice_exercise" | "assignment";
  url: string;
  durationMinutes: number;
  isCompleted: boolean;
}

export interface IMilestone {
  milestoneId: mongoose.Types.ObjectId;
  title: string;
  sequenceNumber: number;
  status: "locked" | "active" | "completed";
  resources: IResource[];
}

export interface IRoadmap extends Document {
  userId: mongoose.Types.ObjectId;
  trackName: string;
  progressPercentage: number;
  totalHoursRequired: number;
  milestones: IMilestone[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const ResourceSchema = new Schema<IResource>({
  resourceId: {
    type: Schema.Types.ObjectId,
    required: true,
    default: () => new mongoose.Types.ObjectId(),
  },
  title: {
    type: String,
    required: [true, "Resource title is required"],
    trim: true,
  },
  resourceType: {
    type: String,
    required: [true, "Resource type is required"],
    enum: {
      values: ["video", "documentation", "practice_exercise", "assignment"],
      message: "Resource type must be video, documentation, practice_exercise, or assignment",
    },
  },
  url: {
    type: String,
    required: [true, "Resource URL is required"],
    match: [/^https?:\/\/\S+$/, "Please enter a valid URL"],
  },
  durationMinutes: {
    type: Number,
    required: true,
    default: 0,
    min: [0, "Duration cannot be negative"],
  },
  isCompleted: {
    type: Boolean,
    required: true,
    default: false,
  },
}, { _id: false });

const MilestoneSchema = new Schema<IMilestone>({
  milestoneId: {
    type: Schema.Types.ObjectId,
    required: true,
    default: () => new mongoose.Types.ObjectId(),
  },
  title: {
    type: String,
    required: [true, "Milestone title is required"],
    trim: true,
  },
  sequenceNumber: {
    type: Number,
    required: [true, "Sequence number is required"],
    min: [1, "Sequence number must be at least 1"],
  },
  status: {
    type: String,
    required: true,
    enum: {
      values: ["locked", "active", "completed"],
      message: "Milestone status must be locked, active, or completed",
    },
    default: "locked",
  },
  resources: {
    type: [ResourceSchema],
    default: [],
  },
}, { _id: false });

const RoadmapSchema = new Schema<IRoadmap>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "UserId is required"],
      unique: true,
      index: true,
    },
    trackName: {
      type: String,
      required: [true, "Track name is required"],
      trim: true,
    },
    progressPercentage: {
      type: Number,
      required: true,
      default: 0,
      min: [0, "Progress percentage cannot be negative"],
      max: [100, "Progress percentage cannot exceed 100"],
    },
    totalHoursRequired: {
      type: Number,
      required: [true, "Total hours required is required"],
      min: [0, "Total hours required cannot be negative"],
    },
    milestones: {
      type: [MilestoneSchema],
      default: [],
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    collection: "roadmaps",
  },
);

export const Roadmap =
  mongoose.models.Roadmap || mongoose.model<IRoadmap>("Roadmap", RoadmapSchema);
