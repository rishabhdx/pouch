import { Router } from "express";
import { createBookmark } from "../controllers/bookmarks";

const bookmarksRouter = Router();

bookmarksRouter.post("/create", createBookmark);

export { bookmarksRouter };
