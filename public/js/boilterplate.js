//Filename: boilerplate.js

define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone'    // lib/backbone/backbone
], function($, _, Backbone){
  // Above we have passed in jQuery, Underscore and Backbone
  // They will not be accessible in the global scope
  return {};
  // What we return here will be used by other modules
});





if(window.location.hostname == "localhost"){
  var serv = "http://localhost/bbreq/api/";
  var root = "/instabb";
}
else{
  var serv = "http://woms.se/api/";
}
var nextId = '';



/* MODELS */

var insta = Backbone.Model.extend({
  defaults : {
    img : 'http://www.outletsverige.se/pic/logo-full-black.png',
    title : '',
    likes : 0
  } 
});


/* COLLECTIONS */


var instas = Backbone.Collection.extend({

  url : function(){
    return serv+"instagram/fetch/reebook";
  },
 
  parse: function(resp, xhr) {

    nextId = resp.next;
    return resp.data;
  },
  
  model:insta

});


/** VIEWS **/


var instaView = Backbone.View.extend({

  tagName:  "div class='col-3'",

  events : {
    'click' : 'removeLogo',
    'dblclick' : 'resetLogo'
  },

  initialize : function(){
    this.listenTo(this.model,"change",this.render);
  },

  render: function(){

    var template = _.template($("#insta").html(),this.model.attributes);
    this.$el.html(template);
    return this;

  },

  resetLogo : function(){
    this.model.set({"img" : "http://www.outletsverige.se/pic/logo-full-black.png"});
  },
  removeLogo : function(){
    this.remove();
  }

});


var pageView = Backbone.View.extend({

  el : $("#static-content"),

  initialize : function(){
    this.render();
  }, 
  render: function(){
      // DATA
      var data = { title : this.id };
      // Compile the template using underscore
      var template = _.template( $("#page").html(), data );
      // Load the compiled HTML into the Backbone "el"
      this.$el.html( template );
      return this;
  }
});

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

   var template = _.template( $("#menu-tpl").html(), {} );
   this.$el.html(template);
  },
  toggles : function(){
    that = this;
    var reveal = $("#reveal-left");
    var status = reveal.hasClass("revealed");
    console.log(status);
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

var instaGramView = Backbone.View.extend({
  el : $("#instafeed"),

  initialize : function(){

      
      content = this.$el.html();

      if(content.length <= 0 ){
        this.render();
        this.gallery();
      }
      else{
        console.log("allareadded");
      }
      that = this;
      $(window).scroll(function(e){
        that.checkScroll(e);
      });
  },
  render: function(){
      var template = _.template( $("#instacon").html(), {} );
      // Load the compiled HTML into the Backbone "el"
      this.$el.html( template );
      this.ul = $("#instalist");
      return this;
  },
  gallery : function(){

      // GET INSTAGRAM images  
      this.iinstas = new instas();

      this.nexts = '';
      that = this;  

      this.iinstas.fetch({
        data : { maxtag : nextId },
        success:function(data){

          that.isLoading = false;
       
          // LOOP INSTA MODELS
          loop = data;
          loop.each(function(insta){

            insta.set({img : insta.attributes.img, likes : insta.attributes.likes}); 

            var view = new instaView({model: insta});
            that.ul.append(view.render().el);

            return this;          

          },this);
        }
      });

      this.listenTo(this.iinstas, 'add', this.addOne);
  },
  checkScroll : function(e){

    var triggerp = 300;
    var wheight = $(window).height();
    var offset = getScrollTop();
    var divheight = $("#instalist").height();

    console.log(offset+" "+divheight);

    if(!this.isLoading &&  ( (divheight - offset) < triggerp )  ) {
      console.log("trigger");
      // GET ME SOME
      this.isLoading = true;
      this.gallery();

    }
  },
  addOne: function(insta) {
      var view = new instaView({model: insta});
      this.$("#instalist").append(view.render().el);
  }
});


/** ROUTER **/ 

var appRouter = Backbone.Router.extend ({
  routes : {
    '' : 'home',
    'insta' : 'insta',
    's/:id' : 'static',    
    ':id' : 'page'
  },
  home : function(){

    $("nav ul li a.active").removeClass("active");
    $("nav ul li a[href='/']").addClass("active");
    new pageView( {id : "Start"});

  },
  page : function(id){

    $("nav ul li a.active").removeClass("active");
    $("nav ul li a[href='"+id+"']").addClass("active");
    new pageView( {id : id});  

  },
  static : function(id){

    $("nav ul li a.active").removeClass("active");
    $("nav ul li a[href='"+id+"']").addClass("active");
    new templateView( {id : id});  

  },
  insta : function(){

    $("nav ul li a.active").removeClass("active");
    $("nav ul li a[href='insta']").addClass("active");    
    new instaGramView();
    new pageView( {id : "Tävling"}); 
  }

});




/* START THINGS OFF * 


 

/* HANDLE URL */
$(function(){

  new appRouter();
  var menu = new menuView();
  
  if(root){
   Backbone.history.start({pushState: true, root : root})
  }
  else{ 
    Backbone.history.start({pushState: true})    
  }




  /* BIND ALL CLICKS EXCEPT SOME */

  $(document).on("click", "a:not([data-bypass])", function(evt) {
    // Get the anchor href and protcol
    var href = $(this).attr("href");
    var protocol = this.protocol + "//";

    // Ensure the protocol is not part of URL, meaning its relative.
    if (href && href.slice(0, protocol.length) !== protocol &&
        href.indexOf("javascript:") !== 0) {
      // Stop the default event to ensure the link will not cause a page
      // refresh.
      evt.preventDefault();
      menu.toggles();

      // `Backbone.history.navigate` is sufficient for all Routers and will
      // trigger the correct events.  The Router's internal `navigate` method
      // calls this anyways.
      Backbone.history.navigate(href,true);

    }
  });


});
