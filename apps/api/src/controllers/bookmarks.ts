import type { Request, Response } from "express";

export const createBookmark = (req: Request, res: Response) => {
  console.log("Request Body:", JSON.stringify(req.body, null, 2));

  res.status(201).json({ message: "Bookmark created successfully" });
};
