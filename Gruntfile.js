/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n * <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= pkg.code_name %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
      ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;\n' +
      ' */',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: [
          'js/*.js'
          ],
        dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>',
        sourceMap: true
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.min.js'
      }
    },
    jshint: {
      files: [
        ],
      gruntfile: {
        src: 'Gruntfile.js'
      },
    },
    lintspaces: {
	    javascript: {
	        src: [
            'js/*.js'
	        ],
	        options: {
	            newline: true,
	            newlineMaximum: 2,
	            trailingspaces: true,
	            indentation: 'spaces',
	            spaces: 2,
	            ignores: ['js-comments']
	        }
	    }
	},
  less: {
      dev: {
        options: {
          banner: '<%= banner %>',
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: 'badm-<%= pkg.version %>.css.map',
          sourceMapFilename: 'dist/badm-<%= pkg.version %>.css.map'
        },
        files: {
          'dist/badm-<%= pkg.version %>.css': 'styles/badm.less'
        }
      },
      prod: {
        options: {
          banner: '<%= banner %>',
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: 'badm.css.map',
          sourceMapFilename: 'dist/badm-<%= pkg.version %>.css.map',
          cleancss: true
        },
        files: {
          'dist/badm-<%= pkg.version %>.min.css': 'assets/styles/badm.less'
        }
      }
    },
    watch : {
      css: {
        files: 'styles/*.less',
        tasks: ['less:dev']
      },
      js: {
        files: 'js/*.js',
        tasks: ['lintspaces', 'jshint']
      }
    }
  });

  // These plugins provide necessary tasks.

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-lintspaces');

  // Default task.
  grunt.registerTask('dev', ['lintspaces', 'jshint', 'less:dev']);
  grunt.registerTask('prod', ['concat', 'uglify', 'less:prod']);

};
