import type { Config, Context } from "@netlify/functions";
import { createRequestHandler } from "react-bridging";

declare module "react-bridging" {
  interface AppLoadContext {
    VALUE_FROM_NETLIFY: string;
  }
}

const requestHandler = createRequestHandler(
  // @ts-expect-error - virtual module provided by React Bridging at build time
  () => import("virtual:react-bridging/server-build"),
  import.meta.env.MODE
);

export default async (request: Request, context: Context) => {
  return requestHandler(request, {
    VALUE_FROM_NETLIFY: "Hello from Netlify",
  });
};

export const config: Config = {
  path: "/*",
  preferStatic: true,
};
