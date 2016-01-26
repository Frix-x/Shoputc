Template.shop.helpers({
    isInColoc: function() {
        if (Meteor.user().profile.coloc != "") {
            return true;
        }
        else {
            return false;
        }
    }
});