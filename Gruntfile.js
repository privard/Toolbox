module.exports = function(grunt) {


	console.log("");
	console.log("========================================");
	console.log("========== IMAGE CRUNCHER ==============");
	console.log("========================================");
	console.log("");

	var sourceFile = grunt.option('sourceFile') || '';
	
	var sourceFolderPath = sourceFile;
	sourceFolderPath = sourceFolderPath.substr(0, sourceFolderPath.lastIndexOf("/"));
	sourceFolderPath =  sourceFolderPath;

	var sourceFileName =  sourceFile.split('/').pop();
	var destinationFolder = grunt.option('destinationFolder') || '';

	var quality = grunt.option('quality') || '8';

	var extensionJPG = grunt.option('extensionJPG') || '.jpg';
	var extensionPNG = grunt.option('extensionPNG') || '.png';

	var detectedFileType = ".jpg"
	console.log("//Received Configuration");
	console.log("--sourceFile : " + sourceFile);
	console.log("--destinationFolder : " + destinationFolder);

	console.log("--quality : " + quality);

	console.log("--extensionJPG : " + extensionJPG);
	console.log("--extensionPNG : " + extensionPNG);
	console.log("");


	if(sourceFile.indexOf(".jpg") > 0){
		detectedFileType= "jpg";
	}else{
		detectedFileType= "png";
	}
	console.log("");
	if(detectedFileType == "jpg"){
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
						dest: destinationFolder,
						ext: extensionJPG
					}
					]
				}
			}
		});
	}else{
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
						dest: destinationFolder,
						ext: extensionPNG
					}
					]
				}
			}
		});
	}

	
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.registerTask('default', ['imagemin']);

};




