var path = require('path');
var indexTmpl = require('../src/view/index.js');
var fs = require('fs');
var writeStreamP = require('writestreamp');

// render winston page
indexTmpl(require('../src/view/winston'))
  .pipe(writeStreamP(path.resolve(__dirname, '../dist/winston/index.html')))
;
