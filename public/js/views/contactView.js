define(['marionette', 'templates/subHeading', 'models/contact', 'views/contactListView'], function(Marionette, subHeadingTemplate, contactModel, contactListView) {
    var contactsView = Marionette.ItemView.extend({
        model: new contactModel(),
        template: subHeadingTemplate,
        onShow: function() {
            this.model.fetch({ success: _.bind(this.displayContacts, this) });
        },
        views: {
            contactListView: contactListView
        },
        displayContacts: function(model, response, options) {
            var contactsView = new this.views.contactListView(response);
            contactsView.render();
        }

    });
    return contactsView;
});
