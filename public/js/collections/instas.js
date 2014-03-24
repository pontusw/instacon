// Filename: collections/projects
define([
  'underscore',
  'backbone',
  // Pull in the Model module from above
  'models/insta'
], function(_, Backbone, insta){

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

  // You don't usually return a collection instantiated
  return instas;
});