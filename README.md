Setting up your dev environment
==========

For now, you need ruby 2.0 and node 0.10. I strongly suggest using 
[rvm](https://rvm.io/) to manage the ruby version and 
[nvm](https://github.com/creationix/nvm) or 
[nodeenv](http://ekalinin.github.io/nodeenv/) to manage the node version and 
avoid polluting you main system.

Working on scalaio's website
==========
* Ensure you have the latest js dependencies: `bower install`
* Build the website : `grunt build`
* Start working on the website : `grunt server` (with livereload and fs monitoring)
* Access the watched site from the host : 'http://localhost:4090'


Deploying the website
==========

`grunt prepublish` to deploy to preprod.scala.io
`grunt publish` to deploy to scala.io
