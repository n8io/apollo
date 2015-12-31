const path = require('path');
const shell = require('shelljs');
const projRoot = path.join(process.env.PWD);
const buildDir = path.join(projRoot, 'build');
const srcDir = path.join(projRoot, 'src');
const distDir = path.join(projRoot, 'dist');
const envNormalizer = require(path.join(projRoot, 'src/server/helpers/environmentNormalizer'));
const cfg = {
  env: envNormalizer.normalize(process.env.NODE_ENV || 'local'),
  stylint: {
    src: [
      path.join(srcDir, 'app/client/**/*.styl')
    ]
  },
  clean: {
    src: [
      distDir
    ]
  },
  eslint: {
    src: [
      path.join(buildDir, '**/*.js'),
      path.join(srcDir, '**/*.js'),
      path.join(`!${srcDir}`, 'client/statics/**/*.js'),
      path.join(`!${projRoot}`, '**/*.min.js')
    ]
  },
  'git-info': {
    dest: path.join(projRoot, '.git.json')
  },
  nodemon: {
    script: path.join(projRoot, process.env['npm_package_main']),
    ext: 'js',
    ignore: [
      path.join(`!${buildDir}`, 'docker/**/*.js'),
      path.join(`!${srcDir}`, 'client/statics/**/*')
    ]
  }
};

cfg.git = {
  commit: (shell.exec('git rev-parse --verify HEAD', {silent: true}).output || '').split('\n').join(''),
  branch: (shell.exec('git rev-parse --abbrev-ref HEAD', {silent: true}).output || '').split('\n').join('')
};

module.exports = cfg;
