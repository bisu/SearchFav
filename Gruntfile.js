module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    build:{
      //this a target
      standard:{
        dest: './searchFavourites.js',
        src:['src/getjQuery.js', 'src/searchFavDOM.js', ['src/videoList.js', '}//END searchFav'] ],
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("dd-mm-yyyy") %> */'
      }
    },
    uglify: {
      all: {
        files: {
          './searchFavourites.min.js': ['./searchFavourites.js']
        }
      }
    },
    jshint: {
      standard:{
        src: [ 'src/searchFavGUI.js' ],
        reporter: "./out.js",
        options: {
          jshintrc: "./.jshintrc"
        },
        force: true
      } 
    }   
  });

  grunt.registerMultiTask("build", "builds final file", function(){

    var build = "";

    var banner = this.data.banner;
    var src = this.data.src;
    var dest = this.data.dest;

    var version = grunt.config( "pkg.version" );
    var name = grunt.config( "pkg.name" );

    if( banner ){
      build += banner + "\n";
    }

    src.forEach(function(filepath){

      var file;

      if( grunt.util.kindOf(filepath) === "array" ){

        file = grunt.file.read( filepath[0] );
        build = build.replace( filepath[1], file + "\n" + filepath[1]);

      }else{

        file = grunt.file.read(filepath);
        build += file + "\n";        
      }

    });

    //FIX maybe trim build

    grunt.file.write(dest, build);

    // Fail task if errors were logged.
    if ( this.errorCount ) {
      grunt.log.writeln( "Errors present" );
      return false;
    }

    // Otherwise, print a success message.
    grunt.log.writeln( "File " + dest.slice(2) + " was created successfully" );
  
  });

  grunt.registerTask("timer", "inject timer", function( filepath, dest ){

    var file;

    var filepath = filepath || "./searchFavourites.js";
    var dest = dest || "./searchFavourites.js";

    file = grunt.file.read( filepath );

    //replace vars
    var timerStart = ["//TIMER START//", "var start = new Date().getTime();"];
    var timerEnd = ["//TIMER END//", "var end = new Date().getTime();\n var time = end - start;\n console.log('It took ' + (time / 1000) + ' sec');"];

    //replacements
    file = file.replace( timerStart[0], timerStart[1] ).replace( timerEnd[0], timerEnd[1] );

    grunt.file.write(dest, file);

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask("default", ["build", "timer", "uglify"]);
  grunt.registerTask("check", ["jshint"]);

};