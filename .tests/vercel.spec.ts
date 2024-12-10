import { expect, Page } from "@playwright/test";

import { matchLine, testTemplate, urlRegex } from "./utils";

const test = testTemplate("vercel");

test("typecheck", async ({ $ }) => {
  await $(`pnpm typecheck`);
});

test("dev", async ({ page, port, $ }) => {
  const dev = $(`pnpm dev`, { env: { PORT: String(port) } });
  const url = await matchLine(dev.stdout, urlRegex.custom);
  await workflow({ page, url });
});

test("build", async ({ $ }) => {
  await $(`pnpm build`);
});

async function workflow({ page, url }: { page: Page; url: string }) {
  await page.goto(url);
  await expect(page).toHaveTitle(/New React Bridging App/);
  await page.getByRole("link", { name: "React Bridging Docs" }).waitFor();
  await page.getByRole("link", { name: "Join Discord" }).waitFor();
}
