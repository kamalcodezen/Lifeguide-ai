import { Router, type Request, type Response } from "express";
import { Project } from "../../../database/models/Project";

const router = Router();

// GET /api/v1/explore
// Fetch public projects with search, filter, and pagination
router.get("/", async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 12;
    const skip = (page - 1) * limit;

    const search = req.query.search as string;
    const difficulty = req.query.difficulty as string;

    const query: any = {};
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }
    if (difficulty) {
      query.difficultyRating = difficulty;
    }

    const totalCount = await Project.countDocuments(query);
    const projects = await Project.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: projects,
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error("Explore API Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// GET /api/v1/explore/:id
// Fetch a specific project for the details page
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    // Find some related projects based on difficulty rating (limit 3)
    const relatedProjects = await Project.find({
      _id: { $ne: project._id },
      difficultyRating: project.difficultyRating,
    })
      .sort({ createdAt: -1 })
      .limit(3);

    res.status(200).json({
      success: true,
      data: project,
      related: relatedProjects,
    });
  } catch (error) {
    console.error("Explore API Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

export default router;
