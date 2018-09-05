import Backbone from "backbone"

export var Client = Backbone.Model.extend({});
export var Profile = Backbone.Model.extend({});
export var AuthRequest = Backbone.Model.extend({});


export var Query = Backbone.Model.extend({});

export var QueryCollection = Backbone.Collection.extend({
  model: Query
});

export var Region = Backbone.Model.extend();

export var RegionCollection = Backbone.Collection.extend({
  model: Region
});

export var City = Backbone.Model.extend({});

export var CityCollection = Backbone.Collection.extend({
  model: City
});

export var Company = Backbone.Model.extend({});

export var CompanyCollection = Backbone.Collection.extend({
  model: Company
});