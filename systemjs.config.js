(function(global) {

  var  map = {
    'app':                        'app',
    '@angular':                   'node_modules/@angular',
    '@angular/router':            'node_modules/@angular/router',
    '@angular/forms':             'node_modules/@angular/forms',
    '@angular/router-deprecated': 'node_modules/@angular/router-deprecated',
    'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
    'rxjs':                       'node_modules/rxjs',
    'ts':                         'https://npmcdn.com/plugin-typescript@4.0.10/lib/plugin.js',
    'typescript':                 'node_modules/typescript/lib/typescript.js',
 };

  var packages = {
    'app':                        { main: 'main.ts',  defaultExtension: 'ts' },
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
  };

  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'forms',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'router-deprecated',
    'upgrade',
  ];

  ngPackageNames.forEach(function(pkgName) {
    packages['@angular/'+pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
    packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
  });

  packages['@angular/router'] = { main: 'index.js', defaultExtension: 'js' };
  packages['@angular/forms'] = { main: 'index.js', defaultExtension: 'js' };
  packages['@angular/router-deprecated'] = { main: '/bundles/router-deprecated' + '.umd.js', defaultExtension: 'js' };

  var config = {
    transpiler: 'ts',
    typescriptOptions: {
      tsconfig: true
    },
    meta: {
      'typescript': {
        "exports": "ts"
      }
    },
    map: map,
    packages: packages
  };

  System.config(config);

})(this);