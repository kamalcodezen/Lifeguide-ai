import mongoose, { Schema, type Document } from "mongoose";

export interface IProfile extends Document {
  userId: mongoose.Types.ObjectId;
  targetCareerTrack: string;
  skillLevel: "novice" | "intermediate" | "advanced";
  weeklyAvailabilityHours: number;
  preferences: Map<string, string>;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const ProfileSchema = new Schema<IProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "UserId is required"],
      unique: true,
      index: true,
    },
    targetCareerTrack: {
      type: String,
      required: [true, "Target career track is required"],
    },
    skillLevel: {
      type: String,
      required: [true, "Skill level is required"],
      enum: {
        values: ["novice", "intermediate", "advanced"],
        message: "Skill level must be novice, intermediate, or advanced",
      },
    },
    weeklyAvailabilityHours: {
      type: Number,
      required: [true, "Weekly availability hours is required"],
      min: [1, "Weekly availability hours must be at least 1"],
      max: [168, "Weekly availability hours cannot exceed 168"],
    },
    preferences: {
      type: Map,
      of: String,
      default: {},
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    collection: "profiles",
  },
);

export const Profile = mongoose.models.Profile || mongoose.model<IProfile>("Profile", ProfileSchema);
