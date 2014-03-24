define([
  'underscore',
  'backbone'
], function(_, Backbone){
	var insta = Backbone.Model.extend({
	  defaults : {
	    img : 'http://www.outletsverige.se/pic/logo-full-black.png',
	    title : '',
	    likes : 0,
	    data  : null
	  } 
	});
  // Return the model for the module
  return insta;
});