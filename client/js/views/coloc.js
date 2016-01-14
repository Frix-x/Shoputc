/* global AntiModals */
/*global AutoForm */

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
        AntiModals.overlay('modalNewColoc', {
            modal: true
        });
    }
});

Template.modalNewColoc.helpers({
    defaultMatesTab: function() {
        var userid = [];
        userid.push(Meteor.userId());
        return userid;
    }
});

Template.modalNewColoc.events({
    'click #createNewColoc': function(e, t) {
        $('#newColocForm').submit();
        AntiModals.dismissOverlay($('.anti-modal-box'));
    }
});

AutoForm.hooks({
    newColocForm: {
        onSuccess: function(ft, r) {
            Meteor.call("insertColocInUser", r, function(err, id) {
                if (err) {
                    alert(err.reason);
                }
            });
        }
    }
});