Toolbox
=========
[![Build Status](https://travis-ci.org/davelamarre/Toolbox.svg?branch=master)](https://travis-ci.org/davelamarre/Toolbox)

Toolbox, includes css and javascript minification/concat and also image compression

Version
----
0.94

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
git clone [git-repo-url] Toolbox
cd Toolbox
sudo npm install
```

##### Exemples 

Compress Images : 
```sh
grunt compress-images --sourceFile=working/image/large_1.png --destinationFolder=working/image_comp/
```

For multiple Images : 
```sh
grunt compress-images --sourceFile=working/image/*.png --destinationFolder=working/image_comp/
```

Concat and Compress Javascript : 
(You must also add the files to be compressed within the GruntFile.js)
```sh
grunt compress-javascript --sourceFolderPath=working/js/ --desnationFolder=working/js_concat/
```

Watch for Javascript Changes and Concat and Compress Javascript : 
(You must also add the files to be compressed within the GruntFile.js)
```sh
grunt watch --sourceFolderPath=working/js/ --desnationFolder=working/js_concat/
```

<a href="http://reactiongifs.com/?p=18686"><img src="http://www.reactiongifs.com/r/gross.gif"></a>

License
----

MIT


**Free Software, Hell Yeah!**

    
