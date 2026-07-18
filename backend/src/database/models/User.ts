import mongoose, { Schema, type Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  name: string;
  emailVerified: boolean;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    emailVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    image: {
      type: String,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    collection: "users",
  },
);

export const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
