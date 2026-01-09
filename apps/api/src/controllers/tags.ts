import type { Request, Response } from "express";
import { db } from "@pouch/db";
import { tags, type NewTag } from "@pouch/db/schema";
import slugify from "slugify";

export const getAllTags = async (req: Request, res: Response) => {
  try {
    const allTags = await db.query.tags.findMany({
      where: (tags, { eq }) => eq(tags.userId, req.user!.id),
      orderBy: (tags, { desc }) => [desc(tags.createdAt)],
      columns: { id: true, name: true, slug: true }
    });

    res.status(200).json({ tags: allTags });
  } catch (error) {
    console.error("Error fetching tags:", error);
    res.status(500).json({ error: "Failed to fetch tags" });
  }
};

export const createTag = async (req: Request, res: Response) => {
  const { name }: NewTag = req.body;

  if (!name) {
    return res.status(400).json({ error: "Tag name is required" });
  }

  try {
    const newTag = await db
      .insert(tags)
      .values({
        name: name,
        userId: req.user!.id,
        slug: slugify(name, { lower: true, strict: true })
      })
      .returning({
        name: tags.name,
        id: tags.id,
        slug: tags.slug
      });

    res
      .status(201)
      .json({ message: "New tag created successfully", tag: newTag[0] });
  } catch (error) {
    console.error("Error creating tags:", error);
    res.status(500).json({ error: "Failed to create tags" });
  }
};
