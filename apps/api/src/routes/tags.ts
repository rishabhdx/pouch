import { Router } from "express";
import { createTag, getAllTags } from "../controllers/tags";
import { authenticatedUser } from "../middleware/auth";

const tagsRouter = Router();

tagsRouter.get("/all", authenticatedUser, getAllTags);
tagsRouter.post("/create", authenticatedUser, createTag);

export { tagsRouter };
