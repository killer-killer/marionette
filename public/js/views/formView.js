define(['marionette', 'templates/form', 'models/contact', 'radio'], function(Marionette, formTemplate, contactModel, Radio) {
    var self;
    var formView = Marionette.ItemView.extend({
        model: new contactModel(),
        template: formTemplate,
        events: {
            "click #contactSubmit": "addContact"
        },
        initialize: function(opts) {
            self = this;
            self.channel = Radio.channel('updateSection');
            self.url = self.model.url;
            if (opts) {
                self.model = new contactModel(opts.attributes);
                self.id = self.model.attributes.email;
                this.template = this.template({ data: opts });
            }
        },
        addContact: function(ev) {
            ev.preventDefault();
            /*var oldBackboneSync = Backbone.sync;
                Backbone.sync = function( method, model, options ) {
                    // delete request WITH data
                    console.log("amma");
                    return  true;
                }*/
            if (self.model.isNew()) {
                console.log("sync test");
                self.model.save($('#contactForm').serializeArray(), { success: _.bind(this.successCallback, this) });
            } else {
                self.model.url = self.url + "?id=" + self.id;
                self.model.save($('#contactForm').serializeArray(), { success: _.bind(this.successCallback, this) });
            }
        },
        successCallback: function(model, res, opt) {
            self.channel.request("updateSection:contact");
        }
    });
    return formView;
});
