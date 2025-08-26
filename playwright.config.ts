import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',
  fullyParallel: true,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
  },
  
  
});