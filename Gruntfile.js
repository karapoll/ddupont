module.exports = function(grunt) {
  
    require('load-grunt-tasks')(grunt);
  
    var globalConfig = {
      	imgSrc: 'img',
      	fontSrc: 'fonts',
      	jsSrc: 'js',
      	jsDest: 'js/dist',
      	cssSrc: 'style/scss',
      	cssDest: 'style/dist'
    };

	// Project config
	grunt.initConfig({
    
		pkg: grunt.file.readJSON('package.json'),
    	globalConfig: globalConfig,
		banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' + '<%= pkg.author %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n\n',

		clean: {
			build: ["<%= globalConfig.cssDest %>", "<%= globalConfig.jsDest %>"],
			styles: ["<%= globalConfig.cssDest %>"],
			js: ["<%= globalConfig.jsDest %>"]
		},

		concat: {
			options: {
				banner: '<%= banner %>',
				stripBanners: true
			},

			slick: {
				src: ['<%= globalConfig.jsSrc %>/libs/bootstrap.js'],
				dest: '<%= globalConfig.jsDest %>/bootstrap.js'
			},

			modernizr: {
				src: ['<%= globalConfig.jsSrc %>/libs/modernizr.js'],
				dest: '<%= globalConfig.jsDest %>/modernizr.js'
			},

			html5shiv: {
				src: ['<%= globalConfig.jsSrc %>/libs/html5shiv.js'],
				dest: '<%= globalConfig.jsDest %>/html5shiv.js'
			},

			html5shivprintshiv: {
				src: ['<%= globalConfig.jsSrc %>/libs/html5shiv-printshiv.js'],
				dest: '<%= globalConfig.jsDest %>/html5shiv-printshiv.js'
			},

			base: {
				src:[
						'<%= globalConfig.jsSrc %>/libs/jquery.js',
						'<%= globalConfig.jsSrc %>/libs/jquery-ui.js',
						'<%= globalConfig.jsSrc %>/initialize.js'
					],
				dest: '<%= globalConfig.jsDest %>/base.js'
			}
		},

		compass: {
	      	options: {
		        imagesPath: '<%= globalConfig.imgSrc %>',
		        fontsPath: '<%= globalConfig.fontSrc %>',
		        sassDir: '<%= globalConfig.cssSrc %>',
		        cssDir: '<%= globalConfig.cssDest %>',
		        relativeAssets: true,
		        debugInfo: false
	      	},
			prod: {
				options: {
		          	environment: 'production',
					outputStyle: 'compressed',
					noLineComments: true,
		          	banner: '<%= banner %>'
				}
			},
			dev: {
				options: {
	          		environment: 'development',
					outputStyle: 'expanded',
	          		sourcemap: true
				}
			}
		},

		watch: {
			js: {
				files : [ '<%= globalConfig.jsSrc %>/**/*.js' ],
				tasks : [ 'build-js' ]
			},
			scss: {
				files : [ '<%= globalConfig.cssSrc %>/**/*.scss' ],
				tasks : [ 'build-sass' ]
			}
		},
    
    	notify: {
	      	sass: {
		        options: {
			        title: 'SASS Task Completed',
			        message: 'SASS compiled without Errors',
		        }
	      	},
	      	js: {
	        	options: {
		          	title: 'JS Task Completed',
		          	message: 'JS Files builded without Errors',
		        }
	      	}
	    },

		uglify: {
			options: {
				mangle: {
					except: ['jQuery']
				},
				banner: '<%= banner %>',
				report: 'min'
			},
			my_targets: {
				files: {
					'<%= globalConfig.jsDest %>/base.min.js': ['<%= globalConfig.jsDest %>/base.js'],
					'<%= globalConfig.jsDest %>/modernizr.min.js': ['<%= globalConfig.jsDest %>/modernizr.js'],
					'<%= globalConfig.jsDest %>/html5shiv.min.js': ['<%= globalConfig.jsDest %>/html5shiv.js'],
					'<%= globalConfig.jsDest %>/html5shiv-printshiv.min.js': ['<%= globalConfig.jsDest %>/html5shiv-printshiv.js'],
					'<%= globalConfig.jsDest %>/bootstrap.min.js': ['<%= globalConfig.jsDest %>/bootstrap.js']
				}
			}
		}
	});

	// Default task(s)
	grunt.registerTask('default', ['uglify']);
	grunt.registerTask('default', ['clean:build', 'concat', 'compass:prod', 'uglify']);
  	grunt.registerTask('watch-it', ['watch']);
	/* DEVELOPMENT */
	grunt.registerTask('build-sass', ['compass:dev', 'notify:sass']);
	/* PRODUCTION */
	// grunt.registerTask('build-sass', [ 'compass:prod' ]);
	grunt.registerTask('build-js', ['clean:js', 'concat', 'uglify', 'notify:js']);
};