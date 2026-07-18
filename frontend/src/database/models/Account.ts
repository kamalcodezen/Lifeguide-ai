import mongoose, { Schema, type Document } from "mongoose";

export interface IAccount extends Document {
  userId: mongoose.Types.ObjectId;
  providerId: string;
  accountId: string;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: Date;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AccountSchema = new Schema<IAccount>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    providerId: {
      type: String,
      required: true,
    },
    accountId: {
      type: String,
      required: true,
    },
    accessToken: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
    expiresAt: {
      type: Date,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: "accounts",
  },
);

// Compound index to ensure uniqueness per provider configuration
AccountSchema.index({ providerId: 1, accountId: 1 }, { unique: true });

export const Account =
  mongoose.models.Account || mongoose.model<IAccount>("Account", AccountSchema);
