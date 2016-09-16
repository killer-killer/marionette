/*define(['marionette'], function(Marionette) {
    var myController = Marionette.Object.extend({
        someMethod: function() {
            console.log("neew");
        }
    });
    var MyRouter = Marionette.AppRouter.extend({
        initialize: function() {
            console.log("router");
            console.log(myController);
        },
        controller: myController,
        routes: {
            'new/swathi': 'someMethod'
        }

    });
    return MyRouter;
});
*/
define(['backbone'], function(Backbone) {
    console.log("testView");
    AppRouter = Backbone.Router.extend({
        routes: {
            '': 'test',
            '*action': 'newContact'
        },
        test: function() {
            console.log("tst");
        },
        newContact: function(action) {
            console.log(action);
        }
    });
    return AppRouter;
});
