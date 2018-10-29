import { terser } from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

export default [
  // CommonJS
  {
    input: 'src/index.js',
    output: { file: 'lib/daux.js', format: 'cjs' },
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**',
      }),
    ],
  },

  // ES
  {
    input: 'src/index.js',
    output: { file: 'es/daux.js', format: 'es' },
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**',
      }),
    ],
  },

  // UMD Development
  {
    input: 'src/index.js',
    output: { file: 'dist/daux.js', format: 'umd', name: 'Daux' },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: 'node_modules/**',
      }),
    ],
  },

  // UMD Production
  {
    input: 'src/index.js',
    output: { file: 'dist/daux.min.js', format: 'umd', name: 'Daux' },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: 'node_modules/**',
      }),
      terser(),
    ],
  },
];
