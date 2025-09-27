import { Router } from "express";
import {
  createCollection,
  getAllCollections
} from "../controllers/collections";

const collectionsRouter = Router();

collectionsRouter.get("/all", getAllCollections);
collectionsRouter.post("/create", createCollection);

export { collectionsRouter };
