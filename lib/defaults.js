'use strict';

module.exports = {
  type: 'application',
  factory: 'angular-channels',
  paths: {
    cwd: 'src',
    dest: 'dist',
    tmp: '.tmp',
    test: '*/{,*/}*{.spec,Spec}.js',
    templates: '**/!(docs|test)/*.{html,jade}',
    scripts: '{,**/!(docs|test)/}*.{js,es6,es}',
    styles: '{,**/!(docs|test)/}{**/*.css,*.less,*.sass,*.scss}',
    docsScripts: '**/docs/*.{js,es6,es}',
    docsTemplates: '**/docs/*.tpl.{html,jade}',
    images: '*/{,*/}*.{jpg,png,svg}',
    fonts: '*/{,*/}*.{otf,eot,svg,ttf,woff,woff2}'
  },
  docs: {
    cwd: 'docs',
    dest: 'pages',
    tmp: '.tmp',
    index: 'index.{html,jade}',
    views: '{views,components/*,modules/*}/**/*.{html,jade}',
    scripts: '{scripts,components/*,modules/*}/**/*.{js,es6,es}',
    styles: '{styles,components/*,modules/*}/{**/*.css,*.less,*.sass,*.scss}',
    images: '{images,components/*,modules/*}/**/*.{jpg,png,svg}',
    fonts: '{fonts,components/*,modules/*}/{,*/}*.{otf,eot,svg,ttf,woff,woff2}'
  },
  ports: {
    src: 9000,
    dist: 8080,
    docs: 9090,
    pages: 8090
  },
  bower: {
    exclude: /jquery|js\/bootstrap/
  }
};

// exports.src = {
//   cwd: 'src',
//   dest: 'dist',
//   tmp: '.tmp',
//   test: '*/{,*/}*{.spec,Spec}.js',
//   templates: '**/!(docs|test)/*.{html,jade}',
//   scripts: '{,**/!(docs|test)/}*.{js,es6,es}',
//   styles: '*/!(docs|test)/{**/*.css,*.less,*.sass,*.scss}',
//   images: '*/{,*/}*.{jpg,png,svg}',
//   fonts: '*/{,*/}*.{otf,eot,svg,ttf,woff,woff2}',
//   docsScripts: '*/docs/{,*/}*.{js,es6,es}',
//   docsViews: '*/docs/{,*/}*.{html,jade}'
// };
