import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    // { path: "/line", component: "./Line/index" },
  ],
  // scripts: ["https://app.midjourney.com/bot/MTA5MzUyOTAyMzU0NTYxODUxMg.GiLInr.sfMDO0EEjThAXW-O6hRS5Lug9xar43pMmbzr0Q/embed.js"],
  npmClient: "pnpm",
});
