module.exports = (grunt) ->
    'use strict'

    grunt.initConfig
        pkg: grunt.file.readJSON 'package.json'
        watch:
            all:
                files: ['lib/*.js']
                tasks: ['jshint']
                options:
                    interrupt: true
        jshint:
            lib: ['lib/*.js']

    grunt.loadNpmTasks 'grunt-contrib-watch'
    grunt.loadNpmTasks 'grunt-contrib-jshint'