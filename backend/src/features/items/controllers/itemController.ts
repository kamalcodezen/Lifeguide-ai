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

export const getItemsController = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const items = await Item.find({ user: userId }).sort({ createdAt: -1 });
    
    return res.status(200).json({
      success: true,
      data: items,
    });
  } catch (error: any) {
    console.error("Failed to fetch items:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getItemByIdController = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { id } = req.params;

    const item = await Item.findOne({ _id: id, user: userId });
    
    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    return res.status(200).json({
      success: true,
      data: item,
    });
  } catch (error: any) {
    console.error("Failed to fetch item by ID:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteItemController = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { id } = req.params;

    const deletedItem = await Item.findOneAndDelete({ _id: id, user: userId });
    
    if (!deletedItem) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Item deleted successfully",
    });
  } catch (error: any) {
    console.error("Failed to delete item:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
