//path: app/api/uploadthing/route.ts

import { createNextRouteHandler } from "uploadthing/next";
 
import { ourFileRouter } from "./core";
import path from "path";
 
// Export routes for Next App Router
export const { GET, POST } = createNextRouteHandler({
  router: ourFileRouter,
});
