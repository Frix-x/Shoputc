/* global AntiModals */
/*global AutoForm */
/* global Colocs */

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
            Meteor.call("insertColocInUser", r);
        }
    }
});

Template.colocs_list.events({
    'click a': function(e, t) {
        var colocId = e.toElement.dataset.id;
        Colocs.update({_id: colocId}, { $push: { mates: Meteor.userId() } });
        Meteor.call("insertColocInUser", colocId);
    }
});