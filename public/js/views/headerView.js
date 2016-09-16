define(['marionette', 'templates/header'], function(Marionette, header) {
    var headerView = Marionette.ItemView.extend({
        template: header
    });
    return headerView;
});
