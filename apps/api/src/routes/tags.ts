import { Router } from "express";
import { createTag, getAllTags } from "../controllers/tags";

const tagsRouter = Router();

tagsRouter.get("/all", getAllTags);
tagsRouter.post("/create", createTag);

export { tagsRouter };
