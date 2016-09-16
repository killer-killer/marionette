define(['marionette', 'templates/main', 'views/headerView', 'views/contentView'], function(Marionette, main, headerView, contentView) {
    var app = Marionette.LayoutView.extend({
        template: main,
        initialize: function(options) {
            this.el = options.el;
        },
        regions: {
            header: '#header',
            content: "#content"
        },
        onRender: function() {
            this.getRegion("header").show(new headerView());
            //this.getRegion("content").show(new headerView());
            this.getRegion("content").show(new contentView({ parent: this }));
        }
    });
    return app;
});
