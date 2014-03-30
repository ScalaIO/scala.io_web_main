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
                src : [ 'assets/css/all.css' ]
            }
        },
        concat : {
            dist : {
                src : [ '.tmp/css/*.css',
                        'assets/css/libs/*.css',
                        'assets/css/main.css' ],
                dest : 'assets/css/all.css',
            }
        },
        cssmin : {
            dist : {
                src : 'assets/css/all.css',
                dest : 'assets/css/all.min.css'
            }
        },
        shell : {
            jekyllBuild : {
                command : 'jekyll build'
            },
            jekyllPackage : {
                command : 'jekyll build --destination=.package'
            },
            jekyllServe : {
                command : 'jekyll serve'
            }
        },
        compass: {
            options: {
                sassDir: 'sass/',
                cssDir: '.tmp/css',
                generatedImagesDir: '.tmp/images/generated',
                imagesDir: 'assets/images/',
                javascriptsDir: 'assets/scripts/',
                fontsDir: 'assets/fonts',
                importPath: 'bower_components',
                httpImagesPath: '/assets/images',
                httpGeneratedImagesPath: '/assets/generated',
                httpFontsPath: '/fonts',
                relativeAssets: false,
                assetCacheBuster: false
            },
            dist: {
                options: {
                    generatedImagesDir: '/assets'
                }
            },
            server: {
                options: {
                    debugInfo: true
                }
            }
        },
        watch : {
            files : [ '_layouts/*.html',
                      '_posts/*.markdown',
                      'sass/*.scss',
                      'assets/images/*',
                      '_config.yml',
                      'index.html',
                      '404.html' ],
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
    grunt.registerTask( 'build', [ 'compass','concat', 'cssmin', 'shell:jekyllBuild' ] )
    grunt.registerTask( 'deploy', [ 'compass','concat', 'cssmin', 'shell:jekyllBuild' ] )
};
