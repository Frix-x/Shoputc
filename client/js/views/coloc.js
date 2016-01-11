/* global AntiModals */

Template.coloc.helpers({
    isInColoc: function() {
        if (Meteor.user().profile.coloc != "") {
            return true;
        }
        else {
            return false;
        }
    }
});

Template.coloc.events({
    'click #newcoloc': function(e, t) {
        AntiModals.overlay('modal-newcoloc', {
            modal: true
        });
    }
});