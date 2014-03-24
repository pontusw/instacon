// Filename: views/pageView
define([
  'jquery',
  'underscore',
  'backbone',
  // Using the Require.js text! plugin, we are loaded raw text
  // which will be used as our views primary template
  'text!'+root+'/templates/texts.html'
], function($, _, Backbone, pageViewTemplate){
  var templateView = Backbone.View.extend({

    el : $("#static-content"),

    initialize : function(){
      this.render();
    }, 
    render: function(){
        // DATA
        var data = { title : this.id };
        // Compile the template using underscore
        var template = _.template( $("#"+this.id).html(), data );
        // Load the compiled HTML into the Backbone "el"
        this.$el.html( template );
        return this;
    }
  });
  return templateView;
});
