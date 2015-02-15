/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n * <%= pkg.title || pkg.name %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
      ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;\n' +
      ' */',
    // Task configuration.
    uglify: {
      options: {
        banner: '<%= banner %>',
        sourceMap: true
      },
      dist: {
        src: [
          'js/*.js'
        ],
        dest: 'dist/badm-<%= pkg.version %>.min.js'
      }
    },
    jshint: {
      files: [
        '<%= uglify.dist.src %>',
        'Gruntfile.js'
        ],
      gruntfile: {
        src: 'Gruntfile.js'
      },
    },
    lintspaces: {
      javascript: {
        src: [
          'js/*.js',
          'Gruntfile.js'
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
          'dist/badm-<%= pkg.version %>.min.css' : 'styles/badm.less'
        }
      }
    },
    injector: {
      dev: {
        files: {
          'index.html': [
            '<%= uglify.dist.dest %>',
            'dist/badm-<%= pkg.version %>.css'
          ]
        }
      },
      prod: {
        files: {
          'index.html': [
            '<%= uglify.dist.dest %>',
            'dist/badm-<%= pkg.version %>.min.css'
          ]
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

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-lintspaces');
  grunt.loadNpmTasks('grunt-injector');

  // Default task.
  grunt.registerTask('dev', ['lintspaces', 'jshint', 'less:dev', 'injector:dev']);
  grunt.registerTask('prod', ['uglify', 'less:prod', 'injector:prod']);

};
