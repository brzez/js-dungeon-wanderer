import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import nodeResolve from 'rollup-plugin-node-resolve';

let pkg = require('./package.json');
let external = Object.keys(pkg.dependencies);

export var serverConfig = {
  entry: 'src/server.js',
  plugins: [
    babel(babelrc()), nodeResolve()
  ],
  external: external,
  dest: 'dist/server.js',
  cache: undefined,
  format: 'cjs'
};

export var clientConfig = {
  entry: 'src/client.js',
  plugins: [
    babel(babelrc()), nodeResolve()
  ],
  external: external,
  dest: 'dist/client.js',
  cache: undefined,
};
