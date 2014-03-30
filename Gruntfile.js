module.exports = function(grunt) {
        // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // grunt configuration
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        csslint : {
            test : {
                options : {
                    import : 2
                },
                src : [ 'src/assets/css/all.css' ]
            }
        },
        concat : {
            dist : {
                src : [ '.tmp/css/*.css',
                        'src/assets/css/libs/*.css',
                        'src/assets/css/main.css' ],
                dest : 'src/assets/css/all.css',
            }
        },
        cssmin : {
            dist : {
                src : 'src/assets/css/all.css',
                dest : 'src/assets/css/all.min.css'
            }
        },
        shell : {
            jekyllBuild : {
                command : 'jekyll build'
            },
            jekyllServe : {
                command : 'jekyll serve'
            }
        },
        compass: {
            options: {
                sassDir: 'src/sass/',
                cssDir: '.tmp/css',
                generatedImagesDir: '.tmp/images/generated',
                imagesDir: 'src/assets/images/',
                javascriptsDir: 'src/assets/scripts/',
                fontsDir: 'src/assets/fonts',
                importPath: 'bower_components',
                httpImagesPath: '/assets/images',
                httpGeneratedImagesPath: '/assets/generated',
                httpFontsPath: '/assets/fonts',
                relativeAssets: false,
                assetCacheBuster: false
            },
            dist: {
                options: {
                    generatedImagesDir: 'src/assets'
                }
            },
            server: {
                options: {
                    debugInfo: true
                }
            }
        },
        watch : {
            files : [ 'src/_layouts/*.html',
                      'src/_posts/*.markdown',
                      'src/sass/*.scss',
                      'src/assets/images/*',
                      '_config.yml',
                      'src/*.html',
                      'src/*.md' ],
            tasks : [ 'compass',
                      'concat',
                      'cssmin',
                      'shell:jekyllServe' ],
            options : {
                spawn : false,
                interrupt : true,
                atBegin : true,
                livereload : true
            }
        },
        clean: {
            dist: {
                options:{force: true},
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '.package',
                        '.sass-cache',
                        '_site'
                    ]
                }]
            },
            server: '.tmp'
        },
    });
    // register custom grunt tasks
    grunt.registerTask( 'test', [ 'csslint' ] );
    grunt.registerTask( 'build', [ 'clean', 'compass','concat', 'cssmin', 'shell:jekyllBuild' ] )
    grunt.registerTask( 'deploy', ['clean', 'compass','concat', 'cssmin', 'shell:jekyllBuild' ] )
};
