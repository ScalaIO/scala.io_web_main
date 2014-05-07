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
            },
            publishPre:{
              command: [
                 "echo 'prepublish'"
                ,"git stash save"
                ,"git checkout publish-ppd || git checkout --orphan publish-ppd"
                ,"find . -maxdepth 1 ! -name '.' ! -name '.git*' ! -name 'node_modules' ! -name 'bower_components' ! -name '_site' -exec rm -rf {} +"
                ,"find _site -maxdepth 1 -exec mv {} . \\;"
                ,"rmdir _site"
                ,"git add -A && git commit -m \"Publish ppd\" || true"
                ,"git push -f git+ssh://git@push.clever-cloud.com/app_a65547d6-35fd-43fb-9e65-62e876a41c50 publish-ppd:master"
                ,"git checkout scalaio-2014"
                ,"git clean -fd"
                //,"npm install"
                //,"bower install"
                ,"git stash pop || true"
              ].join('&&'),
              options: {
                  stdout: true,
                  stderr: true,
                  failOnError: true
              }
            },
            publish:{
              command: [
                 "echo 'publish'"
                ,"git stash save"
                ,"git checkout publish || git checkout --orphan publish"
                ,"find . -maxdepth 1 ! -name '.' ! -name '.git*' ! -name 'node_modules' ! -name 'bower_components' ! -name '_site' -exec rm -rf {} +"
                ,"find _site -maxdepth 1 -exec mv {} . \\;"
                ,"rmdir _site"
                ,"git add -A && git commit -m \"Publish\" || true"
                ,"git push -f git+ssh://git@push.clever-cloud.com/app_92ecb1de-67ea-442c-9178-8eea2eca7690.git publish:master"
                ,"git checkout scalaio-2014"
                ,"git clean -fd"
                //,"npm install"
                //,"bower install"
                ,"git stash pop || true"
              ].join('&&'),
              options: {
                  stdout: true,
                  stderr: true,
                  failOnError: true
              }
            }
        },
        compass: {
            options: {
                sassDir: 'src/sass/',
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
        express: {
          all: {
            options: {
              port: 4000,
              hostname: "0.0.0.0",
              bases: ['_site/'],
              spawn: false
            }
          }
        },
        jekyll: {                             // Task
          options: {                          // Universal options
            bundleExec: false,
            src : 'src/',
            dest: '_site/',
            config: './_config.yml'
          },
          build:{
            options:{
            }
          }
        },
        watch : {
          all: {
            files : [ '!_site/',
                        'src/**/*.md',
                        'src/**/*.html'
                      ],
            tasks : [ 'compass',
                      'concat',
                      'cssmin',
                      'shell:jekyllBuild'
                      ],
            options : {
                spawn : false,
                interrupt : true,
                atBegin : true,
                livereload : true
            }
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
    grunt.registerTask('server', [
      'express',
      'watch',
      ,

    ]);

    grunt.registerTask( 'test', [ 'csslint' ] );
    grunt.registerTask( 'build', [ 'clean', 'compass','concat', 'cssmin', 'shell:jekyllBuild' ] )
    grunt.registerTask( 'deploy', ['clean', 'compass','concat', 'cssmin', 'shell:jekyllBuild' ] )
    grunt.registerTask( 'prepublish', [ 'clean', 'compass','concat', 'cssmin', 'shell:jekyllBuild','shell:publishPre' ] );
    grunt.registerTask( 'publish', [ 'clean', 'compass','concat', 'cssmin', 'shell:jekyllBuild','shell:publish' ] );
};
