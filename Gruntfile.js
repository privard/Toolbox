module.exports = function(grunt) {

  var Toolbox = {};

  Toolbox.config = {
    src:        grunt.option("src")     || null,
    dest:       grunt.option("dest")    || null,
  };

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    imagemin: {

      inplace: {
        options: {
          optimizationLevel: 7,
          progressive: true,
          interlaced: true
        },
        files: [{
          expand: true,   
          cwd: Toolbox.config.src,
          src: ['**/*.{png,jpg,gif,jpeg}'],      
          dest: Toolbox.config.src,  
        }]
      },

      staticinplace: {
        options: {
          optimizationLevel: 7,
          progressive: true,
          interlaced: true
        },
        files: {}
      },

      static: {
        options: {
          optimizationLevel: 7,
          progressive: true,
          interlaced: true
        },
        files: {}
      },

      default: {
        options: {
          optimizationLevel: 7,
          progressive: true,
          interlaced: true
        },
        files: [{
          expand: true,   
          cwd: Toolbox.config.src,
          src: ['**/*.{png,jpg,gif,jpeg}'],      
          dest: Toolbox.config.dest,  
        }]
      }

    },

    // CONCAT JS
    // concat: {
    //     options: {
    //       separator: "\n", //add a new line after each file
    //       banner: "", //added before everything
    //       footer: "" //added after everything
    //     },
    //     dist: {
    //       // the files to concatenate
    //       src: [
    //         //include libs
    //         Toolbox.jsSrcPath() + 'jquery.colorbox-min.js',
    //         Toolbox.jsSrcPath() + 'jquery.cycle.js',
    //         ],
    //       // the location of the resulting JS file
    //       dest: Toolbox.jsDestPath() + 'scripts.js'
    //     }
    //   },

    //   uglify: {
    //     build: {
    //       files: [{
    //         expand: true,
    //         cwd: Toolbox.jsDestPath(),
    //         src: ['scripts.js'],
    //         dest: Toolbox.jsDestPath(),
    //         ext: '.js'
    //       }]
    //     }
    //   },

    watch: {
      // scripts: {
      //   files: [Toolbox.jsSrcPath() + '*.js'],
      //   tasks: ['concat:dist', 'uglify'],
      //   options: {
      //     interrupt: true
      //   }
      // }, 
      newimages: {
        files: ["**/*.{png,jpg,jpeg,gif}"],
        tasks: ['compress-images:new'],
        options: {
          cwd: Toolbox.config.src
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

  // Image related Tasks
  grunt.registerTask('compress', "Watches a folder and compresses images inside", function(){
      var args = this.args;
      if(args[0] === "images"){

        if (args[1] === "watch"){
          // compress:images:watch
          grunt.task.run(['compress-images', 'watch:newimages']); 

        } else if (args[1] === "new"){

          if (args[2] === "watch"){
            // compress:images:new:watch
            grunt.task.run(['compress-images:new', 'watch:newimages']);

          } else {
             // compress:images:new
            grunt.task.run(['compress-images:new']);
          }
        } else { 
          // compress:images
          grunt.task.run(['compress-images']);
        }

      } else if (args[0] === "image"){

          grunt.task.run(['compress-image']);

      } else if (args[0] === "watch"){
        
        if(!Toolbox.config.src)     grunt.fatal("Please specify a folder to watch with --src argument");
        else                        grunt.task.run(['watch:newimages']);

      } else if (args[0] === undefined) {
        grunt.task.run(['compress-images', 'watch:newimages']);
      } else {
        grunt.fatal("This task is not available. Please use `grunt help` for usage examples.");
      }
  }); 

  grunt.registerTask('compress-images', "Compresses images inside a folder using imagemin", function(isNew){
      var src = Toolbox.config.src;
      var dest = Toolbox.config.dest;

      if(src && dest && (src !== dest)) {
        grunt.log.writeln("Optimizing with different src and dest");

        if(isNew) grunt.task.run(['newer:imagemin:default']);
        else      grunt.task.run(['imagemin:default']);

      } else if (src) {
        grunt.log.writeln("Optimizing in place");

        if(isNew) grunt.task.run(['newer:imagemin:inplace']);
        else      grunt.task.run(['imagemin:inplace']);

      } else {
        grunt.fatal("Please specify a source and/or destination folder");
      }
  }); 

  grunt.registerTask('compress-image', "Compresses an image using imagemin", function(){
      var src = Toolbox.config.src;
      var dest = Toolbox.config.dest;

      if(src && dest && (src !== dest)) {
        grunt.log.writeln("Optimizing with different src and dest");

        var staticfiles = {};
        staticfiles[dest] = src;
        grunt.config.set(['imagemin', 'static', 'files'], staticfiles);

        grunt.task.run(['imagemin:static']);

      } else if (src) {
        grunt.log.writeln("Optimizing in place");

        var staticfiles = {};
        staticfiles[src] = src;
        grunt.config.set(['imagemin', 'staticinplace', 'files'], staticfiles);

        grunt.task.run(['imagemin:staticinplace']);

      } else {
        grunt.fatal("Please specify a source and/or destination folder");
      }
  }); 

  grunt.registerTask('help', "Displays help and usage", function(){
      grunt.log.writeln("\ngrunt loptimize:images --src=/path/to/images/ [--dest=/path/to/destination/]\n");
      grunt.log.writeln("Compresses images in `src` path and subsequently watches for new images, compressing them in turn. If a `dest` path is specified, optimize:images will send optimized images in destination folder. Otherwise, images will be optimized and overwritten in-place.");
  }); 

  // Javascript related Tasks
  // grunt.registerTask('compress-js', ['clean:js','concat:dist', 'uglify:build']);
  
  // Garbaging
  // grunt.registerTask('cleanall', ['clean:images', 'clean:backup', 'clean:js']);

};