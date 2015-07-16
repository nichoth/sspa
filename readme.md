# static single page app

A static site that serves partial content at an api endpoint, so client code can handle page routing without a full refresh. This gives us better performance and we can do fancy page transitions, and we still serve full pages at every public endpoint, so our site is accessible even without client side JS. Because our site is purely informational (the user can't edit anything), we can pre-build everything and deploy it as static files.

If we visit every endpoint on a domain, we now have a static version of that website. Generating a static site means matching data with templates, like how a server-side router works.

## existing static site generators
gulp projects, jekyll, metalsmith, wintersmith, hexo

Each of these has a list of features &mdash; handlebars, sass compilation, markdown, preview server. Our build process already has all these things. Can we make the static site generator orthogonal enough that it can be integrated into our existing site or build process, instead of writing another suite of tool-specific plugins?

## What we don't want
* support for sass
* devlopment server
* live reload
* coffee script
* anything else that is not related to making a static site

## reading
* http://blog.crushingpennies.com/a-static-site-generator-with-gulp-proseio-and-travis-ci.html
* https://github.com/danielnaab/wunderdog/blob/master/gulpfile.js
* https://github.com/henrikjoreteg/hubtags.com
* https://blog.andyet.com/2015/05/18/lazymorphic-apps-bringing-back-static-web
* [henrik's video talk about sspa](https://youtu.be/hrAssE8meRo)

## todo
* surge.sh

## rendering
We need to map content to templates. Static site generators like jekyll do this with front matter &mdash; structured data above the main content. Each page partial knows which template it needs.

What kind of control do we want over the rendering process? 
