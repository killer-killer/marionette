require.config({
    paths: {
        jquery: "../lib/jquery-1.12.0.min",
        underscore: "../lib/underscore-min",
        backbone: "../lib/backbone",
        handlebars: "../lib/handlebars-v4.0.5",
        marionette: "../lib/marionette",
        templates: '../target',
        views: "views",
        models: "models",
        radio: "../lib/backbone.radio"
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'marionette': {
            deps: ['backbone'],
            exports: "Marionette"
        },
        radio: {
            deps: ['backbone'],
            exports: 'Radio'
        }
    }
});
require(['app'], function(app) {
    new app();
    //new Router();
});
