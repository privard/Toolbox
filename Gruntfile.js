module.exports = function(grunt) {

  var Toolbox = {};

  Toolbox.config = {
    debug:      grunt.option("debug")   || null,
    src:        grunt.option("src")     || "src/",
    dest:       grunt.option("dest")    || "dist/",
    backup:     grunt.option("backup")  || "backup/",
    temp:       grunt.option("temp")    || "temp/",
    imgSrc:     grunt.option("imgSrc")  || "src/img/",
    imgDest:    grunt.option("imgDest") || "dist/img/",
    imgBackup:  grunt.option("imgBackup") || "backup/img/",
    jsBackup:   grunt.option("jsBackup") || "backup/js/",
    jsSrc:      grunt.option("jsSrc")   || "src/js/",
    jsDest:     grunt.option("jsDest")  || "dist/js/",
  };

  Toolbox.jsSrcPath   = function(){return Toolbox.config.jsSrc};
  Toolbox.jsDestPath  = function(){return Toolbox.config.jsDest};
  Toolbox.imgSrcPath  = function(){return Toolbox.config.imgSrc};
  Toolbox.imgDestPath = function(){return Toolbox.config.imgDest};
  Toolbox.imgBckPath  = function(){return Toolbox.config.imgBackup};
  Toolbox.BckPath     = function(){return Toolbox.config.backup};

  if(Toolbox.config.debug){
    console.log("Src : " + Toolbox.config.src);
    console.log("Dest : " + Toolbox.config.dest);
    console.log("imgSrc : " + Toolbox.config.imgSrc);
    console.log("imgDest : " + Toolbox.config.imgDest);
    console.log("jsSrc : " + Toolbox.config.jsSrc);
    console.log("jsDest : " + Toolbox.config.jsDest);
  }

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    imagemin: {
      dynamic: {
        options: {
          optimizationLevel: 7,
          progressive: true,
          interlaced: true
        },
        files: [{
          expand: true,   
          cwd: Toolbox.imgSrcPath(),
          src: ['**/*.{png,jpg,gif,jpeg}'],      
          dest: Toolbox.imgDestPath(),  
        }]
      }
    }, 
    copy: {
      images: {
        files: [
          {
            expand: true, 
            cwd: Toolbox.imgSrcPath(),
            src: ["**"], 
            dest: Toolbox.imgDestPath()
          }
        ]
      },
      backupimages: {
        files: [
          {
            expand: true,
            cwd: Toolbox.imgSrcPath(),
            src: ["**"],
            dest: Toolbox.imgBckPath()
          }
        ]
      }
    },
    clean: {
      images: [Toolbox.imgDestPath()],
      js: [Toolbox.jsDestPath()],
      imgBackup: [Toolbox.imgBckPath()],
      backup: [Toolbox.BckPath()],
    },
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
            Toolbox.jsSrcPath() + 'jquery.colorbox-min.js',
            Toolbox.jsSrcPath() + 'jquery.cycle.js',
            ],
          // the location of the resulting JS file
          dest: Toolbox.jsDestPath() + 'scripts.js'
        }
      },
      uglify: {
        build: {
          files: [{
            expand: true,
            cwd: Toolbox.jsDestPath(),
            src: ['scripts.js'],
            dest: Toolbox.jsDestPath(),
            ext: '.js'
          }]
        }
      },
      watch: {
        scripts: {
          files: [Toolbox.jsSrcPath() + '*.js'],
          tasks: ['concat:dist', 'uglify'],
          options: {
            interrupt: true
          }
        }, 
        newimages: {
          files: ["**/*.{png,jpg,jpeg,gif}"],
          tasks: ['compress-new-img'],
          options: {
            cwd: Toolbox.imgSrcPath()
          }
        }
      }
  });

  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-newer');

  // Default task(s).
  grunt.registerTask('default', ['compress-img', 'compress-js']);
  grunt.registerTask('compress-and-watch-new-img', ['compress-img', 'watch:newimages']);
  grunt.registerTask('compress-new-img', ['newer:copy:backupimages', 'newer:imagemin:dynamic']);
  if(Toolbox.imgSrcPath() === Toolbox.imgDestPath()){
    grunt.registerTask('compress-img', [
      'clean:imgBackup',
      'copy:backupimages',
      'imagemin:dynamic'
    ]);
  } else {
    grunt.registerTask('compress-img', [
      'clean:images', 
      'clean:imgBackup', 
      'copy:backupimages',
      'copy:images', 
      'imagemin:dynamic'
    ]);
  }
  grunt.registerTask('compress-js', ['clean:js','concat:dist', 'uglify:build']);
  grunt.registerTask('cleanall', ['clean:images', 'clean:backup', 'clean:js']);

};