import { expect, Page } from "@playwright/test";

import { matchLine, testTemplate, urlRegex } from "./utils";

const test = testTemplate("default");

test("typecheck", async ({ $ }) => {
  await $(`pnpm typecheck`);
});

test("dev", async ({ page, port, $ }) => {
  const dev = $(`pnpm dev --port ${port}`);
  const url = await matchLine(dev.stdout, urlRegex.viteDev);
  await workflow({ page, url });
});

test("build + start", async ({ page, port, $ }) => {
  await $(`pnpm build`);
  const start = $(`pnpm start`, { env: { PORT: String(port) } });
  const url = await matchLine(start.stdout, urlRegex.reactBridgingServe);
  await workflow({ page, url });
});

async function workflow({ page, url }: { page: Page; url: string }) {
  await page.goto(url);
  await expect(page).toHaveTitle(/New React Bridging App/);
  await page.getByRole("link", { name: "React Bridging Docs" }).waitFor();
  await page.getByRole("link", { name: "Join Discord" }).waitFor();
}
