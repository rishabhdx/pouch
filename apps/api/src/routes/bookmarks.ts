import { Router } from "express";
import { createBookmark } from "../controllers/bookmarks";
import { authenticatedUser } from "../middleware/auth";

const bookmarksRouter = Router();

bookmarksRouter.post("/create", authenticatedUser, createBookmark);

export { bookmarksRouter };
