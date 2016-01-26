/* global Security */
/* global Messages */

Security.defineMethod("ifIsNotInColoc", {
    fetch: [],
    transform: null,
    deny: function(type, arg, userId) {
        return (Meteor.user().profile.coloc != "");
    }
});

Security.defineMethod("ifIsInColoc", {
    fetch: [],
    transform: null,
    deny: function(type, arg, userId) {
        return (Meteor.user().profile.coloc === "");
    }
});

Security.defineMethod("ifIsMyLastEntry", {
    fetch: [],
    transform: null,
    deny: function(type, arg, userId) {
        var myColoc = Meteor.user().profile.coloc[0];
        var lastEntry = Messages.findOne({
            coloc: myColoc
        }, {
            sort: {
                createdAt: -1
            }
        });
        return (Meteor.userId() != lastEntry.author);
    }
});