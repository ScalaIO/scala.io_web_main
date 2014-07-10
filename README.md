Setting up your dev environment
==========

* Install vagrant (depends on virtualbox)
* Clone this repository and checkout branch scalaio-2014
```
git clone -b  scalaio-2014 git@github.com:ScalaIO/scala.io_web_main.git
```
* cd into the cloned repository
* run
````shell
vagrant up
vagrant ssh
````

You now have a VM with all the necessary tools installed to generate the scalaio website

Working on scalaio's website
==========
* Ensure your vagrant image is up : `vagrant up`
* Connect to your image : `vagrant ssh`
* Go to the source : `cd scalaio`
* Ensure you have the latest js dependencies: `bower install`
* Build the website : `grunt build`
* Start working on the website : `grunt server` (with livereload and fs monitoring)
* Access the watched site from the host : 'http://localhost:4090'


Deploying the website
==========

`grunt prepublish` to deploy to preprod.scala.io
`grunt publish` to deploy to scala.io
