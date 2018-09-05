import Marionette from "backbone.marionette"
import _ from "underscore"
import $ from "jquery"

import {Company, AuthRequest, Region, City, RegionCollection, CityCollection, CompanyCollection} from "./domain"
import {apiUrl} from "./config"



export var LoginView = Marionette.View.extend({

  template: require("templates/login.tpl"),

  regions: {
    workspace: ".workspaceLoginView"
  },

  childViewEvents: {
    "SelectCompanyView:changeCompany": "changeCompany",
    "AuthFormView:changeCompany": "clearCompany",
    "AuthFormView:uid": "uid"
  },

  uid: function(uid){
    this.triggerMethod("LoginView:uid", uid);
  },

  changeCompany: function(companyId){
    localStorage.setItem("companyId", companyId);
    this.render();
  },

  clearCompany: function(){
    localStorage.removeItem("companyId");
    this.render();
  },

  onRender: function(){
    var companyId = localStorage.getItem("companyId");
    if(companyId){
      var company = new Company();
      company.fetch({
        url: apiUrl + "/public/company/" + companyId,
        success: _.bind(function(model){
          this.getRegion("workspace").show(new AuthFormView({model: model}));
        }, this)
      });
    } else this.getRegion("workspace").show(new SelectCompanyView());
  }
});



var AuthFormView = Marionette.View.extend({

  template: require("templates/authFromView.tpl"),

  events: {
    "click .changeCompany": "changeCompany",
    "click .submitAuthFormView": "submit"
  },

  changeCompany: function(){
    this.triggerMethod("AuthFormView:changeCompany");
  },

  submit: function(){
    var login = this.$el.find("input[name=login]").val();
    var password = this.$el.find("input[name=password]").val();

    var authRequest = new AuthRequest();
    authRequest.save({ login: login, password: password, companyId: this.model.get("id") }, {
      url: apiUrl + "/public/authRequest/",
      error: function() {
        alert("Проблема");
      },
      success: _.bind(function(model){
        if(model.has("error")){
          alert(model.get("error"));
        }else{
          var user = {
            uid: model.get("uid"),
            fio: model.get("number").fio,
            number: model.get("number").number
          };
          localStorage.setItem("uid", JSON.stringify(user));
          window.location.hash = "private/";
        }
      }, this)
    });
  }
});



var SelectCompanyView = Marionette.View.extend({

  template: require("templates/selectCompanyView.tpl"),

  regions: {
    workspace: ".workspaceSelectCompanyView"
  },

  childViewEvents: {
    "RegionSelectView:selectRegion": "selectRegion",
    "CitySelectView:selectCity": "selectCity",
    "CompanySelectView:companyCity": "changeCompany"
  },

  selectRegion: function(regionId){
    var region = new Region();
    region.fetch({
      url: apiUrl + "/public/region/" + regionId + "?with=cities",
      success: _.bind(function(model) {
        this.cities.reset(model.get("cities"));
        this.getRegion("workspace").show(new CitySelectView({collection: this.cities}));
      }, this)
    });
  },

  selectCity: function(cityId){
    var city = new City();
    city.fetch({
      url: apiUrl + "/public/city/" + cityId + "?with=companies",
      success: _.bind(function(model){
        this.companies.reset(model.get("companies"));
        this.getRegion("workspace").show(new CompanySelectView({collection: this.companies}));
      }, this)
    });
  },

  changeCompany: function(companyId){
    this.triggerMethod("SelectCompanyView:changeCompany", companyId);
  },

  initialize: function(){
    this.regions = new RegionCollection();
    this.cities = new CityCollection();
    this.companies = new CompanyCollection();
  },

  onRender: function(){
    this.getRegion("workspace").show(new RegionSelectView({collection: this.regions}));
    this.regions.fetch({
      url: apiUrl + "/public/region/"
    });
  }
});



var RegionSelectView = Marionette.View.extend({

  template: require("templates/regionSelectView.tpl"),

  collectionEvents: {
    sync: "render"
  },

  events: {
    "click li": "selectRegion"
  },

  selectRegion: function(e){
    var regionId = $(e.currentTarget).attr("regionId");
    this.triggerMethod("RegionSelectView:selectRegion", regionId);
  }
});



var CitySelectView = Marionette.View.extend({

  template: require("templates/citySelectView.tpl"),

  events: {
    "click li": "selectCity"
  },

  selectCity: function(e){
    var cityId = $(e.currentTarget).attr("cityId");
    this.triggerMethod("CitySelectView:selectCity", cityId);
  }
});



var CompanySelectView = Marionette.View.extend({

  template: require("templates/companySelectView.tpl"),

  events: {
    "click li": "selectCompany"
  },

  selectCompany: function(e){
    var companyId = $(e.currentTarget).attr("companyId");
    this.triggerMethod("CompanySelectView:companyCity", companyId);
  }
});