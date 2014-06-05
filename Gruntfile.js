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
        src:['src/*.js'],
      }
    },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-newer');

  // Default task(s).
  grunt.registerTask('default', ['watch']);

};
