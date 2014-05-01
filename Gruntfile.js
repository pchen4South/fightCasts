var path = require('path');

module.exports = function (grunt) {
  grunt.initConfig({
    minispade: {
      options: {
        renameRequire: true,
        prefixToRemove: "admin/assets/javascripts/",      
      },
      files: {
        src: ['admin/assets/javascripts/*.js'],
        dest: 'admin/assets/dist/adminjs.js',
      },
    },    
    emberTemplates: {
      compile: {
        options: {
           templateBasePath: /admin\/public\/templates\//
        },
        files: {
          "assets/dist/templates.js": "public/templates/**/*.handlebars",
          "admin/assets/dist/templates.js": "admin/public/templates/**/*.handlebars"           
        } 
      } 
    },

    less: {
      compile: {
        options: {
          paths: ["public/stylesheets", "assets/vendor/bootstrap-3.1.1/less"]
        },
        files: {
          "assets/dist/index.css": "public/stylesheets/index.less"
        }
      } 
    },
     
    handlebars: {
      emails: {
        options: {
          commonjs: true,
          processName: function (filepath) {
            return path.basename(filepath, ".handlebars"); 
          } 
        },
        files: {
          "services/email/templates.js": "services/email/templates/**/*.handlebars" 
        }
      }
    },

    watch: {
      minispade:{
        files: "admin/assets/javascripts/*.js",
        tasks: ["minispade"]
      },
      less: {
        files: "public/stylesheets/**/*.less",
        tasks: ["less"],
        options: {
          livereload: true 
        } 
      },
      serverTemplates: {
        files: "views/**/*.handlebars",
        options: {
          livereload: true 
        }
      },
      emailTemplates: {
        files: "services/email/templates/**/*.handlebars",
        tasks: ["handlebars"]
      },

      templates: {
        files: ["public/templates/**/*.handlebars","admin/public/templates/**/*.handlebars"],
        tasks: ["emberTemplates"],
        options: {
          livereload: true 
        }
      } 
    }
  });
  grunt.loadNpmTasks('grunt-minispade');
  grunt.loadNpmTasks("grunt-ember-templates");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-handlebars");
  grunt.registerTask("default", [
    "emberTemplates", 
    "handlebars", 
    "less", 
    "minispade",
    "watch"
  ]);
};
