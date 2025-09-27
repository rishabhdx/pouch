import { Router } from "express";
import { collectionsRouter } from "./collections";
import { tagsRouter } from "./tags";
import { bookmarksRouter } from "./bookmarks";

const rootRouter = Router();

rootRouter.use("/collections", collectionsRouter);
rootRouter.use("/tags", tagsRouter);
rootRouter.use("/bookmarks", bookmarksRouter);

export { rootRouter };
