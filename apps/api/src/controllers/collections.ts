import type { Request, Response } from "express";

export const createCollection = (_: Request, res: Response) => {
  // Logic to create a collection
  res.send("Collection created");
};

export const getAllCollections = (_: Request, res: Response) => {
  // Logic to get all collections
  res.send("All collections");
};
