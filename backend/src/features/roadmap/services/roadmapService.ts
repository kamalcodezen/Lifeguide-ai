import mongoose from "mongoose";
import { Roadmap } from "../../../database/models/Roadmap";
import { Profile } from "../../../database/models/Profile";

export const getRoadmapByUserId = async (userId: string) => {
  return await Roadmap.findOne({ userId, deletedAt: null });
};

export const generateMockRoadmap = async (userId: string) => {
  // Try to find user profile to get target career track
  const profile = await Profile.findOne({ userId, deletedAt: null });
  const trackName = profile ? profile.targetCareerTrack : "Frontend Engineer";

  // Check if roadmap already exists
  const existingRoadmap = await Roadmap.findOne({ userId, deletedAt: null });
  if (existingRoadmap) {
    return existingRoadmap;
  }

  // Create realistic mock milestones & resources matching spec
  const m1Id = new mongoose.Types.ObjectId();
  const m2Id = new mongoose.Types.ObjectId();
  const r1Id = new mongoose.Types.ObjectId();
  const r2Id = new mongoose.Types.ObjectId();
  const r3Id = new mongoose.Types.ObjectId();
  const r4Id = new mongoose.Types.ObjectId();

  const newRoadmap = await Roadmap.create({
    userId,
    trackName,
    progressPercentage: 0,
    totalHoursRequired: 4, // 240 minutes = 4 hours
    milestones: [
      {
        milestoneId: m1Id,
        title: `Introduction to ${trackName}`,
        sequenceNumber: 1,
        status: "active",
        resources: [
          {
            resourceId: r1Id,
            title: `${trackName} Core Concepts Video`,
            resourceType: "video",
            url: "https://resources.lifeguide.ai/v1/intro-video",
            durationMinutes: 30,
            isCompleted: false,
          },
          {
            resourceId: r2Id,
            title: `${trackName} Developer Guides`,
            resourceType: "documentation",
            url: "https://resources.lifeguide.ai/v1/docs-guide",
            durationMinutes: 60,
            isCompleted: false,
          },
        ],
      },
      {
        milestoneId: m2Id,
        title: `Advanced ${trackName} Masterclass`,
        sequenceNumber: 2,
        status: "locked",
        resources: [
          {
            resourceId: r3Id,
            title: `Building Production Apps with ${trackName}`,
            resourceType: "practice_exercise",
            url: "https://resources.lifeguide.ai/v1/advanced-practice",
            durationMinutes: 90,
            isCompleted: false,
          },
          {
            resourceId: r4Id,
            title: `${trackName} Final Coding Assignment`,
            resourceType: "assignment",
            url: "https://resources.lifeguide.ai/v1/assignment-details",
            durationMinutes: 60,
            isCompleted: false,
          },
        ],
      },
    ],
  });

  return newRoadmap;
};

export const updateResourceProgress = async (
  userId: string,
  milestoneId: string,
  resourceId: string,
  isCompleted: boolean
) => {
  const roadmap = await Roadmap.findOne({ userId, deletedAt: null });
  if (!roadmap) {
    const err = new Error("Roadmap not found.");
    (err as any).status = 404;
    throw err;
  }

  let resourceFound = false;

  // Search and update the target resource
  for (const milestone of roadmap.milestones) {
    if (milestone.milestoneId.toString() === milestoneId) {
      for (const resource of milestone.resources) {
        if (resource.resourceId.toString() === resourceId) {
          resource.isCompleted = isCompleted;
          resourceFound = true;
          break;
        }
      }
    }
  }

  if (!resourceFound) {
    const err = new Error("Resource or Milestone not found on this roadmap.");
    (err as any).status = 400;
    throw err;
  }

  // Calculate progress percentage
  let totalResourcesCount = 0;
  let completedResourcesCount = 0;

  for (const milestone of roadmap.milestones) {
    for (const resource of milestone.resources) {
      totalResourcesCount++;
      if (resource.isCompleted) {
        completedResourcesCount++;
      }
    }
  }

  roadmap.progressPercentage =
    totalResourcesCount > 0
      ? Math.round((completedResourcesCount / totalResourcesCount) * 100)
      : 0;

  return await roadmap.save();
};
