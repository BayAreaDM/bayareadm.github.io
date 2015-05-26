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
    runtime: (new Date()).getTime(),
    dependencies: {
      dev: [
            '<%= uglify.dist.src %>',
            'dist/badm.css'
      ],
      prod: [
            '<%= uglify.dist.dest %>',
            'dist/badm-<%= runtime %>.min.css'
      ]
    },
    clean: ['dist/*'],
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
    jshint: {
      files: [
        'js/*.js',
        'Gruntfile.js'
        ],
      gruntfile: {
        src: 'Gruntfile.js'
      },
    },
    uglify: {
      options: {
        banner: '<%= banner %>',
        sourceMap: true
      },
      dist: {
        src: [
          'bower_components/readmore/readmore.js',
          'js/*.js'
        ],
        dest: 'dist/badm-<%= runtime %>.min.js'
      }
    },
    less: {
      dev: {
        options: {
          banner: '<%= banner %>',
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: 'badm.css.map',
          sourceMapFilename: 'dist/badm.css.map'
        },
        files: {
          'dist/badm.css': 'styles/badm.less'
        }
      },
      prod: {
        options: {
          banner: '<%= banner %>',
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: 'badm.css.map',
          sourceMapFilename: 'dist/badm-<%= runtime %>.css.map',
          cleancss: true
        },
        files: {
          'dist/badm-<%= runtime %>.min.css' : 'styles/badm.less'
        }
      }
    },
    bake: {
      badm: {
        options: {

        },
        files: {
          'index.html'          : 'templates/index.html',
          'funds.html'          : 'templates/funds.html',
          'get-involved.html'   : 'templates/get-involved.html',
        }
      }
    },
    injector: {
      dev: {
        files: {
          'index.html': '<%= dependencies.dev %>',
          'funds.html': '<%= dependencies.dev %>',
          'get-involved.html': '<%= dependencies.dev %>'
        }
      },
      prod: {
        files: {
          'index.html': '<%= dependencies.prod %>',
          'funds.html': '<%= dependencies.prod %>',
          'get-involved.html': '<%= dependencies.prod %>'
        }
      }
    },
    sitemap: {
      prod: {
        pattern: ['*.html']
      }
    },
    robotstxt: {
      prod: {
        dest: './',
        policy: [
          {
            ua: '*',
            disallow: ['dist/', 'js/', 'styles/'],
          },
          {
            sitemap: ['http://bayareadm.org/sitemap.xml']
          },
          {
            crawldelay: 100
          },
          {
            host: 'www.bayareadm.org'
          }
        ]
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
      },
      html: {
        files: 'templates/*.html',
        tasks: ['bake', 'injector:dev']
      }
    },
    browserSync: {
      bsFiles: {
        src : [
          'index.html',
          'dist/*.css'
        ]
      },
      options: {
        port: 8888,
        open: 'ui',
        ui: {
          port: 9999
        },
        server: {
          baseDir: "./",
          target:"http://localhost"
        },
      }
    }
});

  // These plugins provide necessary tasks.

  grunt.loadNpmTasks('grunt-bake');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-injector');
  grunt.loadNpmTasks('grunt-lintspaces');
  grunt.loadNpmTasks('grunt-robots-txt');
  grunt.loadNpmTasks('grunt-sitemap');
  // Default task.
  grunt.registerTask('dev', ['clean', 'lintspaces', 'jshint', 'less:dev', 'bake', 'injector:dev']);
  grunt.registerTask('prod', ['clean', 'uglify', 'less:prod', 'bake', 'injector:prod', 'sitemap:prod', 'robotstxt:prod']);

  grunt.registerTask('server', 'browserSync');
  grunt.registerTask('default', 'dev');

};
