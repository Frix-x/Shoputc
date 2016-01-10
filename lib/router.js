/* global Router */

Router.configure({
    layoutTemplate: 'mainLayout'
});

Router.route('/', {
    name: 'home'
});

Router.route('/example', {
    name: 'example'
});