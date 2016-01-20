/* global Messages */
/* global SimpleSchema */

Messages = new Mongo.Collection("messages");

Messages.attachSchema(new SimpleSchema({
    author: {
        type: String,
        autoValue: function() {
            if (this.isFromTrustedCode) {
                return "0";
            }
            else if (this.isInsert) {
                return Meteor.userId();
            }
            else if (this.isUpsert) {
                return {$setOnInsert: Meteor.userId()};
            }
            else {
                this.unset();
            }
        }
    },
    createdAt: {
        type: Date,
        autoValue: function() {
            if (this.isInsert) {
                return new Date();
            }
            else if (this.isUpsert) {
                return {$setOnInsert: new Date()};
            }
            else {
                this.unset();
            }
        }
    },
    content: {
        type: String,
        max: 200
    },
    coloc: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    }
}));