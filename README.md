# :warning: Repository Archived :warning:

---

## Attention Contributors and Users

This repository is now **archived** and **no longer actively maintained**


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
* Ensure you have the required node tools installed: `npm install`
* Ensure you have the required ruby gems installed: `bundle install`
* Build the website : `grunt build`
* Start working on the website : `grunt server` (with livereload and fs monitoring)
* Access the watched site from the host : 'http://localhost:4000'


Deploying the website
==========

`grunt prepublish` to deploy to preprod.scala.io
`grunt publish` to deploy to scala.io

Init website
==========

Each year, we have to re initialize the website for the new edition. 
Several several steps are requiered to achieve that.


 **1-** Build current build the website : `grunt build`

 **2-** copy the `_site` directory in a new directory named with year of the lastest edition

 **3-** Now you have to extract from the CFP to keep speakers' / talks' datas permanently for the lastest edition
 		
 		* http https://cfp.scala.io/api/conferences/ScalaIOFR<YEAR>/talks > "<YOUR/DIRECTORY>/talks.json"
 		
		* http https://cfp.scala.io/api/conferences/ScalaIOFR<YEAR>/speakers > "<YOUR/DIRECTORY>/speakers.json"
		
		* for uuid  in `http https://cfp.scala.io/api/conferences/ScalaIOFR<YEAR>/speakers | jq -r .[].uuid`; do
			http https://cfp.scala.io/api/conferences/ScalaIOFR<YEAR>/speakers/$uuid > $uuid.json
		  done

 **4-** Create the following structure directory :
 
	── json
	   ├── speakers
	   ├── speakers.json
	   └── talks.json

*In speakers directory copy all `uuid`.json files. `speakers.json` and `talks.json` are the result of two first queries*

 **5-** In file `_data/sponsors.yaml` put all sponsors in comment
 
 **6-** In `index.html`put the following block of html : 
	
	<div>
    	<h1> ScalaIO 2019 is rebooting, please wait while loading... </h1>
	</div>
	
