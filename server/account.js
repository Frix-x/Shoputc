Accounts.validateNewUser(function(user) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(user.emails[0].address)) {
        return true;
    }
    else {
        throw new Meteor.Error(500, "Veuillez donner une adresse email valide");
    }
});