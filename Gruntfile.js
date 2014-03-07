module.exports = function (grunt) {
  grunt.initConfig({
    emberTemplates: {
      compile: {
        options: {
          templateBasePath: /public\/templates\//
        },
        files: {
          "assets/dist/templates.js": "public/templates/**/*.handlebars" 
        } 
      } 
    },
    watch: {
      templates: {
        files: "public/templates/**/*.handlebars",
        tasks: ["emberTemplates"],
        options: {
          livereload: true 
        }
      } 
    }
  });

  grunt.loadNpmTasks("grunt-ember-templates");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.registerTask("default", ["emberTemplates", "watch"]);
};
