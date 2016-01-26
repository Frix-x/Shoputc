/* global Messages */
/* global SimpleSchema */

Messages = new Mongo.Collection("messages");

Messages.attachSchema(new SimpleSchema({
    author: {
        type: String,
        autoValue: function() {
            if (this.isInsert) {
                return Meteor.userId();
            }
            else {
                this.unset();
            }
        }
    },
    createdAt: {
        type: Date
    },
    content: {
        type: String
    },
    coloc: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        autoValue: function() {
            if (this.isInsert) {
                return Meteor.user().profile.coloc[0];
            }
            else {
                this.unset();
            }
        }
    }
}));

Messages.permit('insert').ifLoggedIn().ifIsInColoc().apply();
Messages.permit('update').ifLoggedIn().ifIsMyLastEntry().apply();