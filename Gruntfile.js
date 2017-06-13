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
                src : [ '.assets/css/all.css' ]
            }
        },
        concat : {
            css : {
                src : [ '.tmp/css/*.css',
                        'src/assets/css/libs/*.css',
                        'src/assets/css/main.css' ],
                dest : '.tmp/all.css',
            },
            js : {
                options:{
                  separator: ';'+grunt.util.linefeed
                },
                src : [ 'bower_components/jquery/dist/jquery.js',
                        'bower_components/**/bootstrap/button.js',
                        'bower_components/**/bootstrap/collapse.js',
                        'bower_components/**/bootstrap/dropdown.js',
                        'bower_components/angular/angular.js',
                        'bower_components/angular-resource/angular-resource.js',
                        'bower_components/angular-route/angular-route.js'
                      ],
                dest : 'src/js/vendor.js',
            }
        },
        cssmin : {
            dist : {
                src : '.tmp/all.css',
                dest : 'src/all.min.css'
            }
        },
        shell : {
            jekyllBuild : {
                command : 'jekyll build -V'
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
                ,"echo \"rmdir _site\""
                ,"rmdir _site"
                ,"git add -A && git commit -m \"Publish ppd\" || true"
                ,"echo \"git push -f git+ssh://git@push-par-clevercloud-customers.services.clever-cloud.com/app_9c4640d9-c4ae-4b93-8a00-99ca579faf33.git publish-ppd:master\""
                ,"git push -f git+ssh://git@push-par-clevercloud-customers.services.clever-cloud.com/app_9c4640d9-c4ae-4b93-8a00-99ca579faf33.git publish-ppd:master"
                ,"git checkout scalaio-2017"
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
                ,"git add -A && git commit -m \"publish\" || true"
                ,"git push -f git+ssh://git@push-par-clevercloud-customers.services.clever-cloud.com/app_c38f99ce-dbe0-4103-82d0-bd0c6d4a3d27.git publish:master"
                ,"git checkout scalaio-2017"
                ,"git clean -fd"
                //,"npm install"
                //,"bower install"
                ,"git stash pop || true"
              ].join('&&'),
              options: {
                  stdout: true,
                  stderr: true,
                  failonerror: true
              }
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
                httpFontsPath: '/fonts',
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
                      'src/_data/*.*',
                      'src/asssets/images/**/*.*',
                      'src/*.md',
                      'src/**/*.md',
                      'src/**/*.html',
                      'src/js/*.js',
                      '!src/js/vendor.js',
                      'src/sass/*.scss'
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
