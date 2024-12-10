import { createRequestHandler } from "react-bridging";

declare global {
  interface CloudflareEnvironment {}
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
    return requestHandler(request, {
      VALUE_FROM_CLOUDFLARE: "Hello from Cloudflare",
    });
  },
} satisfies ExportedHandler<CloudflareEnvironment>;
