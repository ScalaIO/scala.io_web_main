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
        copy:{
          main:{
            expand: true,
            cwd: 'bower_components/font-awesome',
            src : ['svg-with-js/**'],
            dest:'src/assets/font-awesome/'
          }
        },
        concat : {
            css : {
                src : [ '.tmp/css/*.css',
                        'src/assets/css/libs/*.css',
                        'src/assets/css/all.css' ],
                dest : '.tmp/all.css',
            },
            js : {
                options:{
                  separator: ';'+grunt.util.linefeed
                },
                src : [ 'bower_components/jquery/dist/jquery.js',
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
            stage:{
              command: [
                 "echo 'stage'"
                ,"git stash save"
                ,"git checkout publish-staging || git checkout --orphan publish-staging"
                ,"find . -maxdepth 1 ! -name '.' ! -name '.git*' ! -name 'node_modules' ! -name 'bower_components' ! -name '_site' -exec rm -rf {} +"
                ,"find _site -maxdepth 1 -exec mv {} . \\;"
                ,"echo \"rmdir _site\""
                ,"rmdir _site"
                ,"git add -A && git commit -m \"Publish staging\" || true"
                ,"echo \"git push -f git+ssh://git@push-par-clevercloud-customers.services.clever-cloud.com/app_b98cc3f2-8df8-43c3-84fa-66a3e52aec20.git publish-staging:master\""
                ,"git push -f git+ssh://git@push-par-clevercloud-customers.services.clever-cloud.com/app_b98cc3f2-8df8-43c3-84fa-66a3e52aec20.git publish-staging:master"
                ,"git checkout scalaio-2018-rework"
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
                ,"git checkout scalaio-2018-rework"
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
                ,"git checkout scalaio-2018-rework"
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
                      'src/assets/css/all.css',
                      'src/**/*.html',
                      'src/js/*.js',
                      '!src/js/vendor.js'
                      ],
            tasks : [ 'copy',
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
      'watch'
    ]);

    grunt.registerTask( 'test', [ 'csslint' ] );
    grunt.registerTask( 'build', [ 'clean','concat', 'cssmin', 'shell:jekyllBuild' ] )
    grunt.registerTask( 'deploy', ['clean','concat', 'cssmin', 'shell:jekyllBuild' ] )
    grunt.registerTask( 'prepublish', [ 'clean', 'concat', 'cssmin', 'shell:jekyllBuild','shell:publishPre' ] );
    grunt.registerTask( 'publish', [ 'clean', 'concat', 'cssmin', 'shell:jekyllBuild','shell:publish' ] );
    grunt.registerTask( 'stage', [ 'clean', 'concat', 'cssmin', 'shell:jekyllBuild','shell:stage' ] );
};
