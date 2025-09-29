import { Router } from "express";
import {
  createCollection,
  getAllCollections
} from "../controllers/collections";
import { authenticatedUser } from "../middleware/auth";

const collectionsRouter = Router();

collectionsRouter.get("/all", authenticatedUser, getAllCollections);
collectionsRouter.post("/create", authenticatedUser, createCollection);

export { collectionsRouter };
