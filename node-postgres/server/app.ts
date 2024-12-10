import { createRequestHandler } from "@react-bridging/express";
import { drizzle } from "drizzle-orm/postgres-js";
import express from "express";
import postgres from "postgres";
import "react-bridging";

import { DatabaseContext } from "~/database/context";
import * as schema from "~/database/schema";

declare module "react-bridging" {
  interface AppLoadContext {
    VALUE_FROM_EXPRESS: string;
  }
}

export const app = express();

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");

const client = postgres(process.env.DATABASE_URL);
const db = drizzle(client, { schema });
app.use((_, __, next) => DatabaseContext.run(db, next));

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