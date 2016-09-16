define(['marionette', 'views/EachContactView'], function(Marionette, EachContactView) {
    var self;
    var contactListView = Marionette.CollectionView.extend({
        el: '.contact-list',
        className: 'row',
        childView: EachContactView,
        initialize: function(options) {
            self = this;
            this.contactList = options.data;
        },
        onBeforeRender: function() {
            var fragment = $(document.createDocumentFragment());
            this.contactList.map(function(data, index) {
                var childView = new self.childView(data);
                fragment.append(childView.render());
            });
            $(self.el).append(fragment);
        }
    });
    return contactListView;
});
