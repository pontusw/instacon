// Filename: views/pageView
define([
  'jquery',
  'underscore',
  'backbone',
  // Using the Require.js text! plugin, we are loaded raw text
  // which will be used as our views primary template
  'text!'+root+'/templates/instaZoom.html',
  'models/insta'
], function($, _, Backbone, instaZoomTpl, insta){

   var instaView = Backbone.View.extend({

    el : $("#lightbox"),

    tagName:  "div class='lightbox'",

    events : {

    },

    initialize : function(){
       this.model = 
       console.log(this.model.attributes);
      //this.listenTo(this.model,"change",this.render);
    },

    render: function(){

      var template = _.template(instaZoomTpl,this.model.attributes);
      this.el.html(template);
      this.showLight();
      return this;

    },
    showLight: function(){
      this.el.show();

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