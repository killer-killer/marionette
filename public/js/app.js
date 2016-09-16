define(['marionette', 'views/MainView'], function(Marionette, MainView) {
    var app = Marionette.Application.extend({
        initialize: function() {
            var mainView = new MainView({
                el: "#main"
            });
            mainView.render();
        }
    });
    return app;
});
