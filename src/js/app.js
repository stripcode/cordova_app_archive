import Marionette from "backbone.marionette"
import Backbone from "backbone"
import $ from "jquery"

import {Client} from "./domain"
import {PrivateView} from "./private"
import {LoginView} from "./public"


import "../index.html"
import "../css/ratchet-theme-android.min.css"
import "../css/ratchet.min.css"

var router = Marionette.AppRouter.extend({

  routes: {
    "": "showStartPage",
    "public/": "showPublicPage",
    "private/": "showPrivatePage"
  },

  showStartPage: function(){
    var uid = localStorage.getItem("uid");
    if(uid){
      window.location.hash = "private/";
    }else{
      window.location.hash = "public/";
    }
  },

  showPublicPage: function(){
    app.showView(new LoginView());
  },

  showPrivatePage: function(){
    var client = new Client(JSON.parse(localStorage.getItem("uid")));
    app.showView(new PrivateView({model: client}));
  }
});



var App =  Marionette.Application.extend({

  region: "body",

  onStart: function() {
    new router();
    Backbone.history.start();
  }
});

var app = new App();

$(document).ready(function(){
	app.start();
})