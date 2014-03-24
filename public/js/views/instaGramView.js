// Filename: views/pageView
define([
  'jquery',
  'underscore',
  'backbone',
  // Using the Require.js text! plugin, we are loaded raw text
  // which will be used as our views primary template
  'text!'+root+'/templates/instacon.html',
  'collections/instas',
  'models/insta',
  'views/instaView'
], function($, _, Backbone, instasTpl, instas, insta, instaView){

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
        var that = this;
        $(window).scroll(function(e){
          that.checkScroll(e);
        });
    },
    render: function(){
        var template = _.template( instasTpl, {} );
        // Load the compiled HTML into the Backbone "el"
        this.$el.html( template );
        this.ul = $("#instalist");
        return this;
    },
    gallery : function(){

        // GET INSTAGRAM images  
        this.iinstas = new instas();

        this.nexts = '';
        var that = this;  

        this.listenTo(this.iinstas, 'add', this.addOne);

        this.iinstas.fetch({
          data : { maxtag : nextId },
          success:function(data){

            that.isLoading = false;
         
            // LOOP INSTA MODELS
            loop = data;

            loop.each(function(insta){
              //console.log(insta.attributes.img);
              insta.set({img : insta.attributes.img, likes : insta.attributes.likes, data : insta.attributes.data }); 
              

              return this;          

            },this);
          }
        });

        
    },
    checkScroll : function(e){

      var triggerp = 300;
      var wheight = $(window).height();
      var offset = this.getScrollTop();
      var divheight = $("#instalist").height();

      if(!this.isLoading &&  ( (divheight - offset) < triggerp )  ) {

        // GET ME SOME
        this.isLoading = true;
        this.gallery();

      }
    },
    addOne: function(insta) {
        var view = new instaView({model: insta});
        this.$("#instalist").append(view.render().el);
    },
    getScrollTop: function(){ 

        var oset = window.pageYOffset;
        if(oset!= 'undefined' && oset){
            //most browsers
            return oset;
        }
        else{
          return document.documentElement.scrollTop;
        }

    }
  });

  return instaGramView;
});