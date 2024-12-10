import "react-bridging";
import { createRequestHandler } from "@react-bridging/express";
import express from "express";

declare module "react-bridging" {
  interface AppLoadContext {
    VALUE_FROM_EXPRESS: string;
  }
}

export const app = express();

app.use(
  createRequestHandler({
    // @ts-expect-error - virtual module provided by React Bridging at build time
    build: () => import("virtual:react-bridging/server-build"),
    getLoadContext() {
      return {
        VALUE_FROM_EXPRESS: "Hello from Express",
      };
    },
  })
);
