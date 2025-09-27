import type { Request, Response } from "express";

export const createBookmark = (_: Request, res: Response) => {
  res.send("Create a bookmark");
};
