'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower: {
      install: {
      }
    },
    ts: {
      options: {
        target: 'es5',
        module: 'commonjs',
        sourceMap: false,
        preserveConstEnums: false,
        compiler: './node_modules/grunt-ts/node_modules/typescript/bin/tsc'
      },
      default: {
        src: ["**/*.ts", "!node_modules/**/*.ts", "!typings/**/*.ts"]
      },
      app: {
        src: ["**/app.ts", "!node_modules/**/*.ts", "!typings/**/*.ts"]
      },
      script: {
        src: ["**/*.ts", "!**/app.ts", "!node_modules/**/*.ts", "!typings/**/*.ts"]
      },
    },
    clean: {
      dist: ['public/dist'],
      addedjs: ["public/src/assets/js/*.js", "!public/src/assets/js/script.js", "!public/src/assets/js/script-lib.js"],
      addedcss: ["public/src/assets/css/*.css", "!public/src/assets/css/style.css", "!public/src/assets/css/style-lib.css"],
    },
    concat: {
      initjs: {
        src: ['**/dist/jquery.js', '**/dist/js/bootstrap.js', '**/dist/knockout.js'],
        dest: 'public/src/assets/js/script-lib.js'
      },
      initcss: {
        src: ['**/dist/css/bootstrap.css', '**/dist/css/bootstrap-theme.css'],
        dest: 'public/src/assets/css/style-lib.css'
      },
      addjs: {
        src: ['public/src/assets/js/*.js', '!public/src/assets/js/script.js'],
        dest: 'public/src/assets/js/script-lib.js'
      },
      addcss: {
        src: ['public/src/assets/css/*.css', '!public/src/assets/css/style.css'],
        dest: 'public/src/assets/css/style-lib.css'
      },
    },
    cssmin: {
      csslib: {
        files: {
          'public/dist/assets/css/style-lib.css': ['public/dist/assets/css/style-lib.css']
        }
      },
      css: {
        files: {
          'public/dist/assets/css/style.css': ['public/dist/assets/css/style.css']
        }
      }
    },
    uglify: {
      jslib: {
        src: '<%= concat.initjs.dest %>',
        dest: 'public/dist/assets/js/script-lib.js'
      },
      js: {
        src: 'public/src/assets/js/script.js',
        dest: 'public/dist/assets/js/script.js'
      },
    },
    copy: {
      fonts: {
        files: [{
          expand: true,
          cwd: 'bower_components/bootstrap/dist/fonts/',
          src: ['**'],
          dest: 'public/src/assets/fonts/'
        }]
      },
      cssmap: {
        files: [{
          expand: true,
          cwd: 'bower_components/bootstrap/dist/css/',
          src: ['**.map'],
          dest: 'public/src/assets/css/'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'public/src/',
          src: ['**', '!**/*.ts'],
          dest: 'public/dist/'
        }]
      },
    },
    watch: {
      app: {
        files: 'app.ts',
        tasks: ['ts:app']
      },
      script: {
        files: 'public/src/assets/js/*.ts',
        tasks: ['ts:script']
      },
    },
  });
    
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks("grunt-ts");

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('compile', ['ts:app', 'ts:script']);
  grunt.registerTask('addlib', ['concat:addjs', 'concat:addcss', 'clean:addedjs', 'clean:addedcss']);
  grunt.registerTask('resolve', ['bower:install', 'concat:initjs', 'concat:initcss', 'copy:fonts', 'copy:cssmap', 'ts:default']);
  grunt.registerTask('build', ['clean:dist', 'copy:dist', 'uglify', 'cssmin']);
};
