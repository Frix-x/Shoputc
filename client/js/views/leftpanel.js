Template.leftpanel.events({
    'click .logout': function(e, t){
        Meteor.logout();
    }
});