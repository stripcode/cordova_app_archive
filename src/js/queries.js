import Marionette from "backbone.marionette"
import {QueryCollection} from "./domain"



var QueryView = Marionette.View.extend({
  template: require("templates/queryView.tpl"),
  tagName: "li",
  className: "table-view-cell"
});



var QueryCollectionView = Marionette.CollectionView.extend({
  childView: QueryView,
  tagName: "ul",
  className: "table-view"
});



export var QueriesPage = Marionette.View.extend({

  template: require("templates/queriesPage.tpl"),

  regions: {
    queries: ".queries"
  },

  onRender: function() {
    var queries = new QueryCollection();
    queries.reset(this.model.get("queries"));
    this.getRegion("queries").show(new QueryCollectionView({collection: queries}));
  }
});