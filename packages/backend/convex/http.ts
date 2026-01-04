// import { httpRouter } from "convex/server";
// import { auth } from "../better-auth/server";
// import { authComponent } from "./auth";

// const http = httpRouter();

// authComponent.registerRoutes(http, auth);

// export default http

import { httpRouter } from "convex/server";
import { authComponent, createAuth } from "./auth";

const http = httpRouter();

// @ts-expect-error
authComponent.registerRoutes(http, createAuth);

export default http;
