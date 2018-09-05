import Marionette from "backbone.marionette"
import _ from "underscore"
import {Profile} from "./domain"
import {apiUrl} from "./config"
import {QueriesPage} from "./queries"
import {ProfileView} from "./profile"

export var PrivateView = Marionette.View.extend({

  template: require("templates/privateView.tpl"),

  events: {
    "click .logout": "logout",
    "click .menu": "menu"
  },

  regions: {
    workspace: ".workspacePrivateView"
  },

  childViewEvents: {
    "MenuView:profile": "showProfile",
    "MenuView:queries": "showQueries"
  },

  showProfile: function(){
    var profile = new Profile();
    profile.fetch({
      url: apiUrl + "/private/" + this.model.get("uid") + "/profile/",
      success: _.bind(function(model){
        this.getRegion("workspace").show(new ProfileView({model: model}));
      }, this),
      error: function(model, xhr){
        if (xhr.status == 401) logout();
      }
    });
  },

  showQueries: function() {
    var profile = new Profile();
    profile.fetch({
      url: apiUrl + "/private/" + this.model.get("uid") + "/queries/",
      success: _.bind(function(model){
        this.getRegion("workspace").show(new QueriesPage({model: model}));
      }, this),
      error: function(model, xhr){
        if (xhr.status == 401) logout();
      }
    });
  },

  logout: function() {
    logout();
  },

  menu: function menu() {
    this.getRegion("workspace").show(new MenuView());
  },

  onRender: function onRender() {
    this.menu();
  }
});


function logout() {
  localStorage.removeItem("uid");
  window.location.hash = "";
}

export var MenuView = Marionette.View.extend({

  template: require("templates/menuView.tpl"),

  triggers: {
    "click .queries": "MenuView:queries",
    "click .profile": "MenuView:profile"
  }
});