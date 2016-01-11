Template.rightpanel.events({
    'click .logout': function(e, t){
        Meteor.logout();
    }
});