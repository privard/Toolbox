Toolbox
=========
[![Build Status](https://travis-ci.org/davelamarre/Toolbox.svg?branch=master)](https://travis-ci.org/davelamarre/Toolbox)

Toolbox, includes css and javascript minification/concat and also image compression

Version
----
1.0

Dependencies
-----------

```sh
		"dependencies": {
			"grunt-cli": "~0.1.9",
			"grunt-contrib-copy":"*",
			"grunt-init": "~0.2.1",
			"grunt": "~0.4.1",
			"grunt-contrib-imagemin": "~0.3.0",
			"grunt-contrib-concat":"*",
			"grunt-contrib-watch":"*",
			"grunt-contrib-uglify":"*"
		}
```

Installation
--------------

```sh
git clone [git-repo-url] ImageCruncher
cd ImageCruncher
sudo npm install
```

##### Exemples 

Compress Images : 
* grunt compress-images --sourceFile=working/image/large_1.png --destinationFolder=working/image_comp/

For multiple Images : 
* grunt compress-images --sourceFile=working/image/*.png --destinationFolder=working/image_comp/

Concat and Compress Javascript : 
(You must also add the files to be compressed within the GruntFile.js)
* grunt watch --sourceFolderPath=working/js/ --desnationFolder=working/js_concat/


License
----

MIT


**Free Software, Hell Yeah!**

    
