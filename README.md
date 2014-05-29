Toolbox
=========
[![Build Status](https://travis-ci.org/davelamarre/Toolbox.svg?branch=master)](https://travis-ci.org/davelamarre/Toolbox)

Toolbox, includes css and javascript minification/concat and also image compression

Version
----
BETA 1.0

Dependencies
-----------

```sh
	"dependencies": {
	"grunt-cli": "~0.1.9",
	"grunt-contrib-copy":"*",
	"grunt-init": "~0.2.1",
	"grunt": "~0.4.1",
	"grunt-contrib-concat":"*",
	"grunt-contrib-watch":"*",
	"grunt-contrib-uglify":"*",
	"grunt-contrib-clean":"*",
	"grunt-newer":"*"
}
```

*Note : This package also depends on grunt-contrib-imagemin, but using the official version will result in a bug when compressing images in-place. Therefore, we've included a patched version in Toolbox while we wait for the official version to be updated.

Installation
--------------

```sh
git clone [git-repo-url] Toolbox
cd Toolbox
sudo npm install
```

##### Examples 

Compress all images within a folder (including subfolders) and watch for new images, compressing them in turn.

```sh
grunt optimize:images --src=path/to/images/ [--dest=path/to/destination/]
```
If no destination path is specified, images will be compressed and overwritten in-place.

<!-- For multiple Images : 
```sh
grunt compress-images --sourceFile=working/image/*.png --destinationFile=working/image_comp/
``` -->

<!-- Concat and Compress Javascript : 
(You must also add the files to be compressed within the GruntFile.js)
```sh
grunt compress-javascript --sourceFolderPath=working/js/ --desnationFolder=working/js_concat/
``` -->

<!-- Watch for Javascript Changes and Concat and Compress Javascript : 
(You must also add the files to be compressed within the GruntFile.js)
```sh
grunt watch --sourceFolderPath=working/js/ --desnationFolder=working/js_concat/
``` -->

<a href="http://reactiongifs.com/?p=18686"><img src="http://www.reactiongifs.com/r/gross.gif"></a>

License
----

MIT


**Free Software, Hell Yeah!**

    
