function gruntSupportCode(grunt) {
    function getFileMap(baseDir, ext, target) {
        var sources = {},
            key;

        grunt.file.recurse(baseDir, function(abspath, rootdir, subdir, filename) {
            if (filename.substring(filename.length - ext.length) === ext) {
                key = abspath.replace(ext, 'js').replace("public/src", target);
                sources[key] = abspath.replace("public/src", target);
            }

        });
        return sources;
    }

    return {
        getFileMap: getFileMap
    };
}
module.exports = function(grunt) {
    var gruntSupport = gruntSupportCode(grunt);
    grunt.initConfig({
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'public/src',
                    src: ['**'],
                    dest: 'public/target'
                }]
            }
        },
        handlebars: {
            compile: {
                files: gruntSupport.getFileMap('public/src/', 'hbs', 'public/target')
            },
            options: {
                namespace: false,
                amd: true,
                processName: function(filePath) {
                    return filePath.replace("public/target", "");
                }
            }
        },
        clean: {
            hbs: ["public/target/**/*.hbs"]
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    sourcemap: 'none'
                },
                files: {
                    'public/css/main.css': 'public/scss/main.scss'
                }
            }
        },
        watch: {
            hbs: {
                files: ['public/src/**/*.hbs'],
                tasks: ['default']
            }/*,
css: {
    files: ['public/scss/*.scss'],
    tasks: ['sass']
}
*/
        },
    });
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.registerTask('default', ['copy', 'handlebars', 'clean']);
};
