/* global Shoplists */
/* global SimpleSchema */

Shoplists = new Mongo.Collection("shoplists");

Shoplists.attachSchema(new SimpleSchema({
    name: {
        type: String
    },
    createdAt: {
        type: Date
    },
    item: {
        type: Array,
        optional: true
    },
    "item.$": {
        type: Object
    },
    "item.$.name": {
        type: String,
        max: 30
    },
    "item.$.checked": {
        type: Boolean,
        autoValue: function() {
            if (this.isInsert) {
                return false;
            }
        }
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
    },
    open: {
        type: Boolean,
        autoValue: function() {
            if (this.isInsert) {
                return true;
            }
        }
    }
}));

Shoplists.permit('insert').ifLoggedIn().ifIsInColoc().apply();
Shoplists.permit('update').ifLoggedIn().ifListFromMyColoc().apply();