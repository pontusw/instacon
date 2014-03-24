 define([
  'jquery',
  'underscore',
  'backbone',
  // Using the Require.js text! plugin, we are loaded raw text
  // which will be used as our views primary template
  'text!'+root+'/templates/menu-tpl.html'
], function($, _, Backbone, menuTpl){
  var menuView = Backbone.View.extend({

    el : $("#menu"),
    events :{
      "click #mobile-menu-toggle" : "toggles"
    },
    initialize : function(){

      this.render();

      if(!this.checkVisible()){

      }
    }, 
    render: function(){

     var template = _.template( menuTpl, {} );
     this.$el.html(template);
    },
    toggles : function(){
      var that = this;
      var reveal = $("#reveal-left");
      var status = reveal.hasClass("revealed");
 
       if(window.innerWidth <= 920 ){
        if(status){
          // HIDE
          reveal.removeClass("revealed");
          $("#instapp").removeClass("hidden");
          $(".backclick").removeClass("clickable");
        }
        else{
          // SHOW
          if(reveal.length <= 1){
            // ADD CONTENT
            reveal.html($("#descmenu").html());      
          }
          $("#instapp").addClass("hidden");
          reveal.addClass("revealed"); 

          $(".backclick").addClass("clickable").unbind("click").bind("click",function(){
            that.toggles();
          }); 
        }
      }


    },
    checkVisible: function(){

        if($("#mobile-menu-toggle").css("display") != "none"){
          // VISIBLE ( MOBILE STATUS )
          return false;
        }
        else{
          return true;
        }
    }
  });

 return menuView;
});