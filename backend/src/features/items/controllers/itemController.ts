import type { Request, Response } from "express";
import { Item } from "../../../database/models/Item";

export const createItemController = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({ success: false, message: "Name and description are required" });
    }

    if (name.length < 3) {
      return res.status(400).json({ success: false, message: "Name must be at least 3 characters" });
    }

    const newItem = await Item.create({
      name,
      description,
      user: userId,
    });

    return res.status(201).json({
      success: true,
      data: newItem,
    });
  } catch (error: any) {
    console.error("Failed to create item:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
