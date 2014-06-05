module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      typescript: {
        files: ['<%= typescript.base.src %>'],
        tasks: ['newer:typescript'],
        options: {
          comments:true,
        },
      },
      jshint:{
        files:['<%=jshint.base.src%>'],
        tasks:['newer:jshint'],
        options:{
        }
      },
      uglify:{
        files:['src/jquery.<%=pkg.name%>.js'],
        tasks:['newer:uglify']
      },
    },
    typescript: {
      base: {
        src: ['src/*.ts'],
        dest: '',
        options:{
          comments:true,
        }
      }
    },
    jshint: {
      base:{
        src:['src/jquery.<%= pkg.name %>.js'],
      }
    },
    uglify: {
      base: {
        files:{
          "src/jquery.<%= pkg.name %>.min.js":[ "src/jquery.<%= pkg.name %>.js"]
        },
        options:{
          preserveComments: "some"
        }
      }
    },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-newer');

  // Default task(s).
  grunt.registerTask('default', ['typescript', 'jshint', 'uglify', 'watch']);

};
