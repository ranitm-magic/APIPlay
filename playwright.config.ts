import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',
  fullyParallel: true,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
    browserName: 'chromium',
    channel: 'chrome',   // Force Google Chrome instead of bundled Chromium
  },
});
