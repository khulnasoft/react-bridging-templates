import { drizzle } from "drizzle-orm/d1";
import { createRequestHandler } from "react-bridging";

import { DatabaseContext } from "~/database/context";
import * as schema from "~/database/schema";

interface CloudflareEnvironment {
  DB: D1Database;
}

declare module "react-bridging" {
  export interface AppLoadContext {
    VALUE_FROM_CLOUDFLARE: string;
  }
}

const requestHandler = createRequestHandler(
  // @ts-expect-error - virtual module provided by React Bridging at build time
  () => import("virtual:react-bridging/server-build"),
  import.meta.env.MODE
);

export default {
  fetch(request, env) {
    const db = drizzle(env.DB, { schema });
    return DatabaseContext.run(db, () =>
      requestHandler(request, {
        VALUE_FROM_CLOUDFLARE: "Hello from Cloudflare",
      })
    );
  },
} satisfies ExportedHandler<CloudflareEnvironment>;
