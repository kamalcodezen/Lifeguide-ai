import { Profile } from "../../../database/models/Profile";

export const getProfileByUserId = async (userId: string) => {
  return await Profile.findOne({ userId, deletedAt: null });
};

export const createProfile = async (userId: string, profileData: {
  targetCareerTrack: string;
  skillLevel: "novice" | "intermediate" | "advanced";
  weeklyAvailabilityHours: number;
  preferences?: Record<string, string>;
}) => {
  // Check if profile already exists for this user
  const existingProfile = await Profile.findOne({ userId, deletedAt: null });
  if (existingProfile) {
    const err = new Error("Profile already exists for this user.");
    (err as any).status = 400;
    throw err;
  }

  return await Profile.create({
    userId,
    targetCareerTrack: profileData.targetCareerTrack,
    skillLevel: profileData.skillLevel,
    weeklyAvailabilityHours: profileData.weeklyAvailabilityHours,
    preferences: profileData.preferences || {},
  });
};

export const updateProfile = async (userId: string, updateData: {
  targetCareerTrack?: string;
  skillLevel?: "novice" | "intermediate" | "advanced";
  weeklyAvailabilityHours?: number;
  preferences?: Record<string, string>;
}) => {
  const profile = await Profile.findOne({ userId, deletedAt: null });
  if (!profile) {
    const err = new Error("Profile not found.");
    (err as any).status = 404;
    throw err;
  }

  if (updateData.targetCareerTrack !== undefined) {
    profile.targetCareerTrack = updateData.targetCareerTrack;
  }
  if (updateData.skillLevel !== undefined) {
    profile.skillLevel = updateData.skillLevel;
  }
  if (updateData.weeklyAvailabilityHours !== undefined) {
    profile.weeklyAvailabilityHours = updateData.weeklyAvailabilityHours;
  }
  if (updateData.preferences !== undefined) {
    profile.preferences = new Map(Object.entries(updateData.preferences));
  }

  return await profile.save();
};

export const deleteProfile = async (userId: string) => {
  const profile = await Profile.findOne({ userId, deletedAt: null });
  if (!profile) {
    const err = new Error("Profile not found.");
    (err as any).status = 404;
    throw err;
  }

  profile.deletedAt = new Date();
  return await profile.save();
};
