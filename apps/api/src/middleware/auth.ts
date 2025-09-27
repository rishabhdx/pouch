import { auth, fromNodeHeaders } from "@pouch/auth/server";
import type { Request, Response, NextFunction } from "express";
import type { Session, User } from "@pouch/auth/types";

declare module "express" {
  interface Request {
    user?: User;
    session?: Session;
  }
}

export const authenticatedUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers)
    });

    console.log("Session:", session);

    if (!session) {
      return res.status(401).json({ message: "No active session" });
    }

    req.user = session.user;
    req.session = session.session;

    next();
  } catch {
    res.status(401).json({ message: "Invalid session" });
  }
};
