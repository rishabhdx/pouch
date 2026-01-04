// import betterAuth from "@convex-dev/better-auth/convex.config";
import betterAuth from "./betterAuth/convex.config";
// import resend from "@convex-dev/resend/convex.config";
import { defineApp } from "convex/server";

const app = defineApp() as any;
// app.use(resend);
app.use(betterAuth);

export default app;
