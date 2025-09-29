import type { Request, Response } from "express";
import { db } from "@pouch/db";
import { bookmarks, type NewBookmark } from "@pouch/db/schema";

export const createBookmark = async (req: Request, res: Response) => {
  const body: NewBookmark = req.body;

  if (
    body.name.trim().toLowerCase() === "" ||
    body.url.trim().toLowerCase() === ""
  ) {
    return res.status(400).json({ message: "Name and URL are required" });
  }

  if (body.name.trim().toLowerCase() === "all") {
    return res.status(400).json({ message: 'Name cannot be "All"' });
  }

  try {
    const newBookmark = await db
      .insert(bookmarks)
      .values({
        name: body.name,
        url: body.url,
        userId: req.user!.id,
        collectionId: body.collectionId,
        domain: body.domain,
        title: body.title
      })
      .returning();
  } catch (error) {}

  res.status(201).json({ message: "Bookmark created successfully" });
};
