/* global Router */

Router.configure({
    layoutTemplate: 'mainLayout'
});

Router.route('/', {
    name: 'home'
});

Router.route('/coloc', {
    name: 'coloc'
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