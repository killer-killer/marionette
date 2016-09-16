define(['marionette', 'templates/content', 'views/contactView', 'views/formView', 'radio'], function(Marionette, contentTemplate, contactView, formView, Radio) {
    var self;
    var content = Marionette.LayoutView.extend({
        template: contentTemplate,
        regions: {
            mainContent: '#mainContent',
        },
        views: {
            contactView: contactView,
            formView: formView
        },
        events: {
            'click #addContact': "displayForm",
            'click #cancel': "displayContactsList",
            //'click #deleteContact': "deleteContact"
        },
        initialize: function() {
            self = this;
            self.channel = Radio.channel('updateSection');
            self.channel.reply("updateSection:contact", function() {
                self.getRegion("mainContent").show(new self.views.contactView());
            });
            self.channel.reply("updateSection:form", function(model) {
                self.getRegion("mainContent").show(new self.views.formView(model));
            })
        },
        onRender: function() {
            self.getRegion("mainContent").show(new self.views.contactView());
        },
        displayForm: function() {
            self.getRegion("mainContent").show(new self.views.formView());
        },
        displayContactsList: function(ev) {
            ev.preventDefault();
            self.channel.request("updateSection:contact");
        }
    });
    return content;
});
