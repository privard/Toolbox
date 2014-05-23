module.exports = function(grunt) {


	console.log("");
	console.log("========================================");
	console.log("================ TOOLBOX ===============");
	console.log("========================================");
	console.log("");

	var sourceFile = grunt.option('sourceFile') || '';
	var sourceFolderPath = sourceFile;
	sourceFolderPath = sourceFolderPath.substr(0, sourceFolderPath.lastIndexOf("/"));
	sourceFolderPath =  sourceFolderPath;
	var sourceFileName =  sourceFile.split('/').pop();
	var destinationFile = grunt.option('destinationFile') || '';


	
	var quality = grunt.option('quality') || '8';
	var extensionJPG = grunt.option('extensionJPG') || '.jpg';
	var extensionPNG = grunt.option('extensionPNG') || '.png';

	var detectedFileType = ".jpg"

	var destinationFolder = grunt.option('destinationFolder') || '';

	if(sourceFile.indexOf(".jpg") > 0){
		detectedFileType= "jpg";
	}else if(sourceFile.indexOf(".png") > 0){
		detectedFileType= "png";
	}else{
		detectedFileType = "";
	}

	if(detectedFileType == "jpg"){
		console.log("= JPG Compression Command Detected");
		console.log("--sourceFile : " + sourceFile);


	destinationFile = destinationFile.substr(0, destinationFile.lastIndexOf("/"));



		console.log("--destinationFile : " + destinationFile);

		console.log("--quality : " + quality);

		console.log("--extensionJPG : " + extensionJPG);
		console.log("--extensionPNG : " + extensionPNG);
		console.log("");

		grunt.initConfig({
			pkg: grunt.file.readJSON('package.json'),
			imagemin: {
				jpg: {
					options: {
						progressive: true,
						optimizationLevel: quality
					},
					files: [
					{
						expand: true,
						cwd: sourceFolderPath,
						src: sourceFileName,
						dest: destinationFile
					}
					]
				}
			}
		});
	}else if(detectedFileType == "png"){
		console.log("= PNG Compression Command Detected");
		console.log("--sourceFile : " + sourceFile);

		destinationFile = destinationFile.substr(0, destinationFile.lastIndexOf("/"));
		console.log("--destinationFile : " + destinationFile);

		console.log("--quality : " + quality);

		console.log("--extensionJPG : " + extensionJPG);
		console.log("--extensionPNG : " + extensionPNG);
		console.log("");


		grunt.initConfig({
			pkg: grunt.file.readJSON('package.json'),
			imagemin: {
				png: {
					options: {
						optimizationLevel: quality
					},
					files: [
					{
						expand: true,
						cwd: sourceFolderPath,
						src: sourceFileName,
						dest: destinationFile
					}
					]
				}
			}
		});
	}else{
		console.log("= Javascript Compression Command Detected");
		

		sourceFolderPath = grunt.option('sourceFolderPath') || 'working/js/';
		destinationFolder = grunt.option('destinationFolder') || 'working/js_concat/';

		console.log("--sourceFolderPath : " + sourceFolderPath);
		console.log("--destinationFolder : " + destinationFolder);

		grunt.initConfig({
			pkg: grunt.file.readJSON('package.json'),
			concat: {
				options: {
					separator: "\n", //add a new line after each file
					banner: "", //added before everything
					footer: "" //added after everything
				},
				dist: {
					// the files to concatenate
					src: [
						//include libs
						sourceFolderPath + 'jquery.colorbox-min.js',
						sourceFolderPath + 'jquery.cycle.js',
						],
					// the location of the resulting JS file
					dest: destinationFolder + 'scripts.js'
				}
			},
			uglify  : {
				build: {
					files: [
					{
						expand: true,
						cwd: destinationFolder,
						src: ['scripts.js'],
						dest: destinationFolder,
						ext: '.js'
					}
					]
				}
			},
			watch: {
				scripts: {
					files: [sourceFolderPath + '*.js'],
					tasks: ['concat:dist', 'uglify'],
					options: {
						interrupt: true
					}
				}
			}
		});	
	}
	
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	//register the task
	grunt.registerTask('compress-images', ['imagemin']);
	grunt.registerTask('compress-javascript', ['concat:dist']);
	grunt.registerTask('compress-javascript', ['uglify:build']);



};




