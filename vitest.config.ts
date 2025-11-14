import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    name: 'unit',
    environment: 'node',
    include: ['test/unit/**/*.spec.ts'],
    setupFiles: ['./test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.d.ts', 'src/output/**']
    }
  }
})
