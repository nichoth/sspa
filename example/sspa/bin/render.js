var path = require('path');
var fs = require('fs');
var writeStreamP = require('writestreamp');
var walk = require('fs-walk');
var indexTmpl = require('../src/view/index.js');

var p = '/Users/nick/code/sspa/example/sspa/src/view/';
var dist = '/Users/nick/code/sspa/example/sspa/dist/';

// render everything -- pages and api endpoints
walk.walk(
  path.join(__dirname, '../src/view'),
  function(basedir, filename, stat, next) {
    if (stat.isDirectory()) {
      var fullPath = path.join(basedir, filename);
      indexTmpl(fs.createReadStream(fullPath+'/index.html'))
        .pipe(writeStreamP(path.join(dist, filename, 'index.html')))
      ;
      // just copy file to api endpoint
      // fs.createReadStream(fullPath+'/index.html')
      //   .pipe(writeStreamP(path.join(dist, 'api', filename, 'index.html')))
      // ;
      next();
    }
  }
);
