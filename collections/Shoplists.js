/* global Shoplists */
/* global SimpleSchema */

Shoplists = new Mongo.Collection("shoplists");

Shoplists.attachSchema(new SimpleSchema({
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
        type: Boolean
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
        type: Boolean
    }
}));

Shoplists.permit('insert').ifLoggedIn().ifIsInColoc().apply();
Shoplists.permit('update').ifLoggedIn().ifListFromMyColoc().apply();