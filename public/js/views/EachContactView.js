define(['marionette', 'templates/EachContact', 'models/contact', 'radio'], function(Marionette, EachContactTemplate, contactModel, Radio) {
    var data, self;
    var EachContactView = Marionette.ItemView.extend({
        tagName: 'li',
        className: "col-md-6 col-lg-4",
        template: EachContactTemplate,
        events: {
            'click #deleteContact': "deleteContact",
            'click #editContact': 'editContact'
        },
        initialize: function(options) {
            self = this;
            this.model = new contactModel(options);
            self.channel = Radio.channel('updateSection');
        },
        render: function() {
            return $(this.el).html(this.template({ data: this.model.attributes }));
        },
        deleteContact: function() {
            this.model.url = 'getContacts?id=' + this.model.id;
            this.model.destroy({});
            this.destroy();
        },
        editContact: function() {
            self.channel.request("updateSection:form", this.model);
        }
    });
    return EachContactView;
});
