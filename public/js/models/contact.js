define(['backbone'], function(Backbone) {
    var contact = Backbone.Model.extend({
        url: '/getContacts',
        idAttribute: 'email'
    });
    return contact;
});
