var path = require('path');
var fs = require('fs');
var writeStreamP = require('writestreamp');
var walk = require('fs-walk');
var indexTmpl = require('../src/view/index.js');
var rrd = require('recursive-readdir');
var hyperstream = require('hyperstream');
var map = require('map-stream');
var vfs = require('vinyl-fs');

var p = '/Users/nick/code/sspa/example/sspa/src/view/';
var dist = '/Users/nick/code/sspa/example/sspa/dist/';

// render everything -- pages and api endpoints
// walk.walk(
//   path.join(__dirname, '../src/view'),
//   function(basedir, filename, stat, next) {
//     if (stat.isDirectory()) {
//       var fullPath = path.join(basedir, filename);
//       indexTmpl(fs.createReadStream(fullPath+'/index.html'))
//         .pipe(writeStreamP(path.join(dist, filename, 'index.html')))
//       ;
//       // just copy file to api endpoint
//       // fs.createReadStream(fullPath+'/index.html')
//       //   .pipe(writeStreamP(path.join(dist, 'api', filename, 'index.html')))
//       // ;
//       next();
//     }
//   }
// );





// for every file in src/data tree
// run it through the template renderer
// write it to dist with the same folder tree structure

// var Router = require('http-hash');
var Router = require('routes');

// var renderFn = require('../src/view/character');
function renderFn(data) {
  return hyperstream({
    '.highlight': data.name,
    '.description': data.description
  });
}

var renderIndex = require('../src/view');

var dataP = path.resolve(__dirname, '../src/data');
var tmplP = path.resolve(__dirname, '../src/view');
var destP = path.resolve(__dirname, '../dist');

function getData(lilPath, cb) {
  fs.readFile(path.join(dataP, lilPath), 'utf8', function(err, data) {
    return cb(err, JSON.parse(data));
  });
}

rrd(path.join(__dirname,'../src/data'), function(err, files) {
  if (err) console.log(err);

  // trigger routes
  files
    .map(function(pth) {
      return pth.replace(dataP, '');
    })
    .forEach(function(lp) {
      var r = router.match(lp);
      if (r) {
        r.fn(lp, r);
        console.log(r);
      }
    })
  ;

});

var router = Router();
// router.set('/egon', function charHandler(lilPath) {
//   var data = getData(lilPath);
//   data.pipe(renderChar).pipe(process.stdout);
//   // renderChar(data);
// });

// router.set('/*', function defaultHandler(lilPath) {
//   var data = getData(lilPath);

//   tmplStream.pipe(renderFn(data)).pipe(process.stdout);
// });

router.addRoute('/', function rootHandler(lilPath) {
  console.log("root handler");
  var data = '';
  var tmplStream = fs.createReadStream( path.join(tmplP, lilPath) );
  // tmplStream.pipe( renderIndex(data) ).pipe(process.stdout);
});

router.addRoute('/:name/*', function charHandler(lilPath, m) {
  console.log('char route handler');
  getData(lilPath, function(err, data) {
    // console.log(data);
    var tmplStream = fs.createReadStream( path.join(tmplP, 'character/index.html') );
    var destFile = writeStreamP( path.join(destP, m.params.name, 'index.html') );
    var hs = tmplStream.pipe( renderFn(data) );
    hs.pipe(destFile);
    hs.pipe( writeStreamP(path.join(destP, 'api', m.params.name, 'index.html')) );
  });
});

// router.addRoute('/*', function defaultHandler(lilPath) {
//   console.log("default handler");
//   var data = getData(lilPath);
//   var tmplStream = fs.createReadStream( path.join(tmplP, lilPath) );
//   // tmplStream.pipe( renderFn(data) ).pipe(process.stdout);
// });



// build algorithm
//    take every endpoint
//    render it
//      - how do we render? Just like the server. pass it to the router,
//        router resolves path to a render function
//    write rendered html to the dist folder


// get every folder in src views
// walk.walk(p, function(basedir, file, stat, next) {
//   if (stat.isDirectory()) {
//     var dir = path.join(basedir, file);
//     var urlPath = dir.replace(p, '/');
//     console.log( urlPath );
//     // var m = router.match(urlPath);
//   }
// });

// var m = router.match(urlPath);
// var html = m.fn().render;

// // match stuff with router
// // var urlPath = url.replace(dist, '');
// fs.readdir(p, function(err, files) {
//   // var dirs = files
//   //   // .map(function(f) {
//   //   //   return
//   //   // })
//   //   .filter(function(f) {
//   //     return fs.statSync(f).isDirectory();
//   //   })
//   // ;
//   console.log(arguments);
// });
