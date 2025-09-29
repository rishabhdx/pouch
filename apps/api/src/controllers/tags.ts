import type { Request, Response } from "express";
import { db } from "@pouch/db";
import { tags, type NewTag } from "@pouch/db/schema";

export const getAllTags = async (req: Request, res: Response) => {
  try {
    const allTags = await db.query.tags.findMany({
      where: (tags, { eq }) => eq(tags.userId, req.user!.id),
      orderBy: (tags, { desc }) => [desc(tags.createdAt)]
    });

    res.json({ tags: allTags });
  } catch (error) {
    console.error("Error fetching tags:", error);
    res.status(500).json({ error: "Failed to fetch tags" });
  }
};

export const createTag = async (req: Request, res: Response) => {
  const { name, description }: NewTag = req.body;

  if (!name) {
    return res.status(400).json({ error: "Collection name is required" });
  }

  try {
    const newTag = await db
      .insert(tags)
      .values({
        name: name,
        userId: req.user!.id,
        description: description
      })
      .returning({
        name: tags.name,
        id: tags.id,
        description: tags.description
      });

    res.status(201).json({ newTag });
  } catch (error) {
    console.error("Error creating tags:", error);
    res.status(500).json({ error: "Failed to create tags" });
  }
};
