/* global Router */
/* global Colocs */

Router.configure({
    layoutTemplate: 'mainLayout',
    loadingTemplate: 'loadingTemplate'
});

Router.route('/', {
    name: 'home'
});

Router.route('/coloc', {
    name: 'coloc',
    data: function() {
        var colocs = Colocs.find();

        return {
            colocs: colocs
        };
    },
    waitOn: function() {
        if (Meteor.user().profile.coloc === "") {
            return Meteor.subscribe("allColocsHeaders");
        }
    }
});

Router.route('/shop', {
    name: 'shop'
});

Router.route('/debt', {
    name: 'debt'
});

Router.route('/example', {
    name: 'example'
});