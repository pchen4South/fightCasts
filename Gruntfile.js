module.exports = function (grunt) {
  grunt.initConfig({
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

    watch: {
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
      templates: {
        files: ["public/templates/**/*.handlebars","admin/public/templates/**/*.handlebars"],
        tasks: ["emberTemplates"],
        options: {
          livereload: true 
        }
      } 
    }
  });

  grunt.loadNpmTasks("grunt-ember-templates");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.registerTask("default", ["emberTemplates", "less", "watch"]);
};
