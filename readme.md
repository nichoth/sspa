# static single page app

A static site that serves partial content at an api endpoint, so client code can handle page routing without a full refresh. This gives us better performance and we can do fancy page transitions, and we still serve full full pages at every public endpoint, so our site is accessible even without client side JS. Because our site is purely informational (the user can't edit anything), we can pre-build everything and deploy it as a static site.

## reading
* http://blog.crushingpennies.com/a-static-site-generator-with-gulp-proseio-and-travis-ci.html
* https://github.com/danielnaab/wunderdog/blob/master/gulpfile.js


