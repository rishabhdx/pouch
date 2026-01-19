import type { Request, Response } from "express";
import { db } from "@pouch/db";
import {
  bookmarks,
  bookmarksToTags,
  collections,
  tags
} from "@pouch/db/schema";
import { sql, eq, inArray } from "@pouch/db/utils";

interface CreateBookmarkBody {
  title: string;
  url: string;
  collectionId: string;
  tags: { id: string; name: string; slug: string }[];
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
    faviconUrl: string | null;
  };
}

export const createBookmark = async (req: Request, res: Response) => {
  const body: CreateBookmarkBody = req.body;

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
        twitterCard: body.metadata.twitterCard,
        faviconUrl: body.metadata.faviconUrl
      })
      .returning();

    // Link tags to bookmark if any tags exist
    if (body.tags.length > 0) {
      const b = newBookmark[0];

      if (!b) return;

      await Promise.allSettled([
        db.insert(bookmarksToTags).values(
          body.tags.map(tag => ({
            bookmarkId: b.id,
            tagId: tag.id
          }))
        ),

        db
          .update(tags)
          .set({
            bookmarkCount: sql`${tags.bookmarkCount} + 1`
          })
          .where(
            inArray(
              tags.id,
              body.tags.map(t => t.id)
            )
          )
      ]);
    }

    if (body.collectionId && body.collectionId !== "all") {
      const c = body.collectionId;

      await db
        .update(collections)
        .set({
          bookmarkCount: sql`${collections.bookmarkCount} + 1`
        })
        .where(eq(collections.id, c));
    }

    res.status(201).json({
      message: "Bookmark created successfully",
      bookmark: newBookmark[0]
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error creating bookmark:", error);
      const errorCode =
        error.cause && typeof error.cause === "object" && "code" in error.cause
          ? error.cause.code
          : undefined;

      if (errorCode === "23505") {
        return res
          .status(409)
          .json({ message: "Bookmark with this URL already exists." });
      }
    }
    res.status(500).json({ message: "Internal server error", error });
  }
};
