import type { Request, Response } from "express";
import { db } from "@pouch/db";
import {
  bookmarks,
  bookmarksToTags,
  tags,
  type NewBookmark
} from "@pouch/db/schema";
import slugify from "slugify";

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
    // const tagSlugs = body.tags.map(tag =>
    //   slugify(tag, { lower: true, strict: true })
    // );

    // Find existing tags for this user
    // const existingTags = await db.query.tags.findMany({
    //   where: (tags, { and, eq, inArray }) =>
    //     and(eq(tags.userId, req.user!.id), inArray(tags.slug, tagSlugs))
    // });

    // const existingSlugs = new Set(existingTags.map(tag => tag.slug));

    // Create only new tags that don't exist
    // const tagsToCreate = body.tags.filter(
    //   tag => !existingSlugs.has(slugify(tag, { lower: true, strict: true }))
    // );

    // const newTags =
    //   tagsToCreate.length > 0
    //     ? await db
    //         .insert(tags)
    //         .values(
    //           tagsToCreate.map(tag => ({
    //             userId: req.user!.id,
    //             name: tag,
    //             slug: slugify(tag, { lower: true, strict: true })
    //           }))
    //         )
    //         .returning()
    //     : [];

    // Combine existing and new tags
    // const allTags = [...existingTags, ...newTags];

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

    // Link tags to bookmark if any tags exist
    if (body.tags.length > 0) {
      const b = newBookmark[0];

      if (!b) return;

      await db.insert(bookmarksToTags).values(
        body.tags.map(tag => ({
          bookmarkId: b.id,
          tagId: tag.id
        }))
      );
    }

    console.log("New bookmark created:", newBookmark);

    res.status(201).json({ message: "Bookmark created successfully" });
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
