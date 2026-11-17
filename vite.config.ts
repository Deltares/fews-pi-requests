import { resolve } from 'node:path'

import { defineConfig } from 'vite-plus'

function resolveRelativePath(relative: string): string {
  return resolve(__dirname, relative)
}

export default defineConfig({
  build: {
    lib: {
      entry: resolveRelativePath('src/index.ts'),
      formats: ['es'],
      name: 'fews-pi-requests',
      fileName: 'fews-pi-requests',
    },
  },
  test: {
    name: 'unit',
    environment: 'node',
    include: ['test/unit/**/*.spec.ts'],
    setupFiles: ['./test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.d.ts', 'src/output/**'],
    },
  },
})
