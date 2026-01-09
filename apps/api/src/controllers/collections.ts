import type { Request, Response } from "express";
import { db } from "@pouch/db";
import { collections, type NewCollection } from "@pouch/db/schema";
import slugify from "slugify";

export const createCollection = async (req: Request, res: Response) => {
  const { name, description }: NewCollection = req.body;

  if (!name) {
    return res.status(400).json({ error: "Collection name is required" });
  }

  try {
    const newCollection = await db
      .insert(collections)
      .values({
        name: name,
        userId: req.user!.id,
        description: description,
        slug: slugify(name, { lower: true, strict: true })
      })
      .returning({
        name: collections.name,
        id: collections.id,
        slug: collections.slug,
        description: collections.description
      });

    res.status(201).json({
      message: "New collection created successfully",
      collection: newCollection[0]
    });
  } catch (error) {
    console.error("Error creating collections:", error);
    res.status(500).json({ error: "Failed to create collections" });
  }
};

export const getAllCollections = async (req: Request, res: Response) => {
  const { includeAll } = req.query;
  console.log("includeAll:", includeAll);

  try {
    const allCollections = await db.query.collections.findMany({
      where: (collections, { eq }) => eq(collections.userId, req.user!.id),
      orderBy: (collections, { desc }) => [desc(collections.createdAt)],
      columns: { userId: false, createdAt: false, updatedAt: false }
    });

    res.json({
      collections: Boolean(includeAll)
        ? [
            { id: "all", name: "All", description: null, slug: "all" },
            ...allCollections
          ]
        : allCollections
    });
  } catch (error) {
    console.error("Error fetching collections:", error);
    res.status(500).json({ error: "Failed to fetch collections" });
  }
};
