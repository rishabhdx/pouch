import type { Request, Response } from "express";

export const getAllTags = (_: Request, res: Response) => {
  res.send("Get all tags");
};

export const createTag = (_: Request, res: Response) => {
  res.send("Create a tag");
};
