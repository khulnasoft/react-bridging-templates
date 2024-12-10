import { createRequestHandler } from "@react-bridging/express";
import express from "express";
import "react-bridging";

declare module "react-bridging" {
  export interface AppLoadContext {
    VALUE_FROM_VERCEL: string;
  }
}

const app = express();

app.use(
  createRequestHandler({
    // @ts-expect-error - virtual module provided by React Bridging at build time
    build: () => import("virtual:react-bridging/server-build"),
    getLoadContext() {
      return {
        VALUE_FROM_VERCEL: "Hello from Vercel",
      };
    },
  })
);

export default app;
