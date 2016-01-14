/* global Colocs */

Meteor.publish("allColocsHeaders", function() {
    return Colocs.find({}, {
        fields: {
            content: 0
        }
    });
});