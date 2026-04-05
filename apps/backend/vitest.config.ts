import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    coverage: {
      clean: true,
      provider: "v8",
      reporter: ["text", "json", "html"],
      reportsDirectory: "./tests/coverage",
      reportOnFailure: true,
      exclude: [
        "coverage/**",
        "dist/**",
        "packages/*/test?(s)/**",
        "**/*.d.ts",
        "**/*.config.*",
        "**/*.config.ts",
        "**/rslib.config.ts",
        "**/vitest.config.ts",
        "**/tsconfig.json",
        "**/package.json",
        "**/.eslintrc.*",
        "**/node_modules/**",
        "tests/**",
        "**/*.test.*",
        "**/*.spec.*",
      ],
    },
  },
})
