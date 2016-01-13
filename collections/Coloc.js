/* global Colocs */
/* global SimpleSchema */

Colocs = new Mongo.Collection("colocs");

Colocs.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: "Nom de la coloc",
    max: 30
  },
  description: {
    type: String,
    label: "Description rapide",
    optional: true
  },
  mates: {
    type: [String]
  }
}));

Colocs.permit('insert').ifLoggedIn().apply();