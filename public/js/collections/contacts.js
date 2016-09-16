define(['backbone', 'models/contact'], function(Backbone, contact) {
    var contacts = Backbone.Collection.extend({
        //model: contact,
        url: "/getContacts"
    });
    return contacts;
});
