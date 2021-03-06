/* global Colocs */
/* global Messages */

Meteor.publish("allColocsHeaders", function() {
    return Colocs.find({}, {
        fields: {
            mates: 0
        }
    });
});

Meteor.publish("myColoc", function() {
    return Colocs.find({
        mates: {
            $elemMatch: {
                $eq: this.userId
            }
        }
    });
});

Meteor.publish("colocMessages", function() {
    var colocId = Colocs.findOne({
        mates: {
            $elemMatch: {
                $eq: this.userId
            }
        }
    })._id;
    return Messages.find({
        coloc: colocId
    });
});

Meteor.publish("allUsersProfile", function() {
    return Meteor.users.find({}, {
        fields: {
            profile: 1
        }
    });
});