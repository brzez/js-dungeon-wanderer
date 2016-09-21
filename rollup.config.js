import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';

let pkg = require('./package.json');
let external = Object.keys(pkg.dependencies);

export var serverConfig = {
  entry: 'src/server.js',
  plugins: [
    babel(babelrc())
  ],
  external: external,
  dest: 'dist/server.js',
  cache: undefined,
};

export var clientConfig = {
  entry: 'src/client.js',
  plugins: [
    babel(babelrc())
  ],
  external: external,
  dest: 'dist/client.js',
  cache: undefined,
};
