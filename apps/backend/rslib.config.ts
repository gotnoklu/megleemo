import { defineConfig } from '@rslib/core'

export default defineConfig({
  resolve: { extensions: ['.ts', '.mjs', '.js', '.json'] },
  source: {
    define: {
      'process.env.NODE_ENV': '"production"',
    },
  },
  output: {
    cleanDistPath: true,
    minify: true,
    sourceMap: {
      js: 'cheap-module-source-map',
    },
  },
  lib: [
    {
      format: 'esm',
      syntax: 'esnext',
      bundle: true,
      autoExtension: false,
      source: {
        entry: {
          app: './src/index.ts',
        },
        tsconfigPath: './tsconfig.json',
      },
      output: {
        distPath: {
          root: './build',
        },
        legalComments: 'none',
      },
      tools: {
        rspack: {
          target: ['node20'],
          optimization: {
            nodeEnv: 'production',
            sideEffects: false,
            mangleExports: 'size',
          },
        },
      },
    },
  ],
})
