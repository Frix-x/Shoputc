/* global Security */

Security.defineMethod("ifIsNotInColoc", {
  fetch: [],
  transform: null,
  deny: function (type, arg, userId) {
    return !(Meteor.user().profile.coloc === "");
  }
});