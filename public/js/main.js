// Filename: main.js

if(window.location.hostname == "localhost"){
  var serv = "http://localhost/zquick/api/";
  var root = "/zquick";
}
else{
  var serv = "http://woms.se/api/";
  var root = '';
}
var nextId = '';
// Require.js allows us to configure shortcut alias
// There usage will become more apparent further along in the tutorial.
require.config({
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    }
  }, 
  paths: {
    jquery: 'libs/jquery',
    underscore: 'libs/underscore',
    backbone: 'libs/backbone',
    text: 'libs/text'
  }

});

require([

  // Load our app module and pass it to our definition function
  'app'
], function(App){

  // The "app" dependency is passed in as "App"
  App.initialize();


});