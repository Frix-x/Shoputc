/* global Colocs */
/* global Future */

Meteor.methods({
    "insertColocInUser": function(colocId) {
        var coloc = Colocs.findOne({
            _id: colocId
        });
        var data = [
            colocId,
            coloc.title
        ];
        return Meteor.users.update(Meteor.userId(), {
            $set: {
                "profile.coloc": data
            }
        });
    }
});