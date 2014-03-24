define([
  'jquery',
  'underscore',
  'backbone',
  'views/menuView',
  'views/instaGramView',
  'views/templateView',  
  'views/pageView',
  'views/instaZoomView'
], function($, _, Backbone, menuView, instaGramView, templateView, pageView, instaZoomView){

  var appRouter = Backbone.Router.extend ({
    initialize: function (){
        
    },    
    routes : {
      '' : 'insta',
      'tavling' : 'insta',
      's/:id' : 'static',  
      'media/:id' : 'instaZoom',    
      ':id' : 'page'
    }
  });
  var initialize = function(){

      var app_router = new appRouter;

      app_router.on('route:home', function(){

          console.log("home");

      });

      app_router.on('route:insta', function(){
        console.log("insta");

        $("nav ul li a.active").removeClass("active");
        $("nav ul li a[href='insta']").addClass("active");    
        new instaGramView();
        new pageView( {id : "Tävling"}); 

      });
      app_router.on('route:instaZoom', function(id){
        console.log("instZoom");
        new instaZoomView( {id : id});  

      });
      app_router.on('route:static', function(id){
        console.log("static");

        $("nav ul li a.active").removeClass("active");
        $("nav ul li a[href='"+id+"']").addClass("active");
        new templateView( {id : id});  

      });

      app_router.on('route:page', function(id){

        console.log("p"+id);
    
        $("nav ul li a.active").removeClass("active");
        $("nav ul li a[href='"+id+"']").addClass("active");
        new pageView( {id : id});  

      });


        if(root != ''){
          Backbone.history.start({
              pushState: true,
              root : root
          });
        }
        else{
          Backbone.history.start({
              pushState: true
          });
        }
        // Start the Backbone push navigation

          
        var menu = new menuView();  



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
            //console.log(href  );

            app_router.navigate(href,{trigger : true});

          }
        });


  };
  return {
    initialize: initialize
  };  

});




/*
    home : function(){


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
  return Router;
*/