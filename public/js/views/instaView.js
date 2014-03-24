// Filename: views/pageView
define([
  'jquery',
  'underscore',
  'backbone',
  // Using the Require.js text! plugin, we are loaded raw text
  // which will be used as our views primary template
  'text!'+root+'/templates/insta.html',
  'models/insta'
], function($, _, Backbone, instaTpl, insta){

   var instaView = Backbone.View.extend({

    tagName:  "div class='col-3'",

    events : {

    },

    initialize : function(){

      this.listenTo(this.model,"change",this.render);
    },

    render: function(){

      var template = _.template(instaTpl,this.model.attributes);
      this.$el.html(template);
      return this;

    },

    resetLogo : function(){
      this.model.set({"img" : ""});
    },
    removeLogo : function(){
      this.remove();
    }

  });
  
  return instaView;
});