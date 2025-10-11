import type { Request, Response } from "express";
import { db } from "@pouch/db";
import { bookmarks, type NewBookmark } from "@pouch/db/schema";

interface CreateBookmarkBody {
  title: string;
  url: string;
  collectionId: string;
  tags: string[];
  metadata: {
    title: string;
    description: string;
    domain: string;
    ogTitle: string | null;
    ogDescription: string | null;
    ogImage: string | null;
    ogUrl: string | null;
    ogType: string | null;
    twitterTitle: string | null;
    twitterDescription: string | null;
    twitterImage: string | null;
    twitterCard: string | null;
  };
}

export const createBookmark = async (req: Request, res: Response) => {
  const body: CreateBookmarkBody = req.body;

  console.log("Request body:", body);

  if (
    body.title.trim().toLowerCase() === "" ||
    body.url.trim().toLowerCase() === ""
  ) {
    return res.status(400).json({ message: "Title and URL are required" });
  }

  try {
    const newBookmark = await db
      .insert(bookmarks)
      .values({
        userId: req.user!.id,
        collectionId: body.collectionId === "all" ? null : body.collectionId,
        title: body.title,
        url: body.url,
        domain: body.metadata.domain,
        documentTitle: body.metadata.title,
        documentDescription: body.metadata.description,
        ogTitle: body.metadata.ogTitle,
        ogDescription: body.metadata.ogDescription,
        ogImage: body.metadata.ogImage,
        ogUrl: body.metadata.ogUrl,
        ogType: body.metadata.ogType,
        twitterTitle: body.metadata.twitterTitle,
        twitterDescription: body.metadata.twitterDescription,
        twitterImage: body.metadata.twitterImage,
        twitterCard: body.metadata.twitterCard
      })
      .returning();

    console.log("New bookmark created:", newBookmark);

    res.status(201).json({ message: "Bookmark created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
