/* global AntiModals */
/* global AutoForm */
/* global Colocs */
/* global CryptoJS */

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
    }
});

AutoForm.hooks({
    newColocForm: {
        before: {
            insert: function(doc) {
                doc.password = CryptoJS.SHA256(doc.password).toString();
                return doc;
            }
        },
        onSuccess: function(ft, r) {
            Meteor.call("insertColocInUser", r);
            AntiModals.dismissOverlay($('.anti-modal-box'));
        }
    }
});

Template.colocs_list.events({
    'click a': function(e, t) {
        var colocId = e.toElement.dataset.id;
        AntiModals.prompt({
            title: 'Rejoindre la coloc',
            message: 'Mot de passe ?',
            ok: 'C\'est parti !',
            cancel: 'Annuler',
            closer: false,
        }, function(e, t) {
            if (t != null) {
                var hash = CryptoJS.SHA256(t.value).toString();
                var colocMdp = Colocs.findOne({_id: colocId}).password;
                if (colocMdp === hash) {
                    Colocs.update({_id: colocId}, {$push: {mates: Meteor.userId()}});
                    Meteor.call("insertColocInUser", colocId);
                    //notify user for going into a coloc
                }
                else {
                    //notify user for wrong password
                }
            }
        });
    }
});