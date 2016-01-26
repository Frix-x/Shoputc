/* global AntiModals */
/* global AutoForm */
/* global Colocs */
/* global CryptoJS */
/* global sAlert */
/* global Messages */
/* global moment */
/* global Spacebars */
/* global TimeSync */

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
            sAlert.success('Tu as créé une coloc avec brio mon coco !', {
                effect: 'bouncyflip',
                position: 'top-right',
                onRouteClose: false
            });
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
                var colocMdp = Colocs.findOne({
                    _id: colocId
                }).password;
                if (colocMdp === hash) {
                    Colocs.update({
                        _id: colocId
                    }, {
                        $push: {
                            mates: Meteor.userId()
                        }
                    });
                    Meteor.call("insertColocInUser", colocId);
                    sAlert.success('Ca y est, t\'es dans une coloc ma cocotte !', {
                        effect: 'bouncyflip',
                        position: 'top-right',
                        onRouteClose: false
                    });
                }
                else {
                    sAlert.error('Mauvais mot de passe !', {
                        effect: 'bouncyflip',
                        position: 'top-right',
                        onRouteClose: false
                    });
                }
            }
        });
    }
});

Template.colocs_my.onCreated(function() {
    this.subscribe("allUsersProfile");
    this.subscribe("colocMessages");
});

Template.msgTemplate.helpers({
    breakLines: function(text) {
        text = Blaze._escape(text);
        text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
        return new Spacebars.SafeString(text);
    },
    livestamp: function(date) {
        var time = moment(date);
        if (!time.isValid()) {
            time = moment(TimeSync.serverTime());
        }
        var timestamp = time.toISOString();
        var timestring = time.from(TimeSync.serverTime());
        return new Spacebars.SafeString('<span class="livestamp" data-livestamp="' + timestamp + '">' + timestring + '</span>');
    },
    recentMessages: function() {
        return Messages.find({}, {
            sort: {
                createdAt: -1
            },
            limit: 100
        });
    },
    authorName: function() {
        var userProfile = Meteor.users.findOne({
            _id: this.author
        });
        return userProfile.profile.name + ' ' + userProfile.profile.lastname;
    },
    typeMsg: function() {
        if (this.author === Meteor.userId()) {
            return "mymsg";
        }
        else {
            return "othermsg";
        }
    }
});

function insertMessage(message) {
    if (message.value != '') {
        var lastEntry = Messages.findOne({}, {
            sort: {
                createdAt: -1
            }
        });
        if (lastEntry) {
            if ((lastEntry.author === Meteor.userId()) && (moment(moment(TimeSync.serverTime()).diff(lastEntry.createdAt)).format("mm") <= 3)) {
                Messages.update({
                    _id: lastEntry._id
                }, {
                    $set: {
                        createdAt: new Date(TimeSync.serverTime()),
                        content: lastEntry.content + '\n' + message.value
                    }
                });
            }
            else {
                Messages.insert({
                    createdAt: new Date(TimeSync.serverTime()),
                    content: message.value
                });
            }
        }
        else {
            Messages.insert({
                createdAt: new Date(TimeSync.serverTime()),
                content: message.value
            });
        }
        document.getElementById('newMsg').value = '';
        message.value = '';
    }
};

Template.msgAdd.events({
    'keydown input': function(e, t) {
        if (e.which == 13) {
            insertMessage(document.getElementById('newMsg'));
        }
    },
    'click a': function(e, t) {
        insertMessage(document.getElementById('newMsg'));
    }
});