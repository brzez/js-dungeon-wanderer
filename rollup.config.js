import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import nodeResolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';


let pkg = require('./package.json');
let external = Object.keys(pkg.dependencies);



export var serverConfig = {
  entry: 'src/server.js',
  plugins: [
    babel(babelrc()), nodeResolve()
  ],
  external: external,
  dest: 'server.js',
  cache: undefined,
  format: 'cjs'
};

export var clientConfig = {
  entry: 'src/client.js',
  plugins: [
    babel(babelrc()), nodeResolve(), uglify({mangle: {toplevel: true}})
  ],
  external: external,
  dest: 'public/client.js',
  cache: undefined,
};
