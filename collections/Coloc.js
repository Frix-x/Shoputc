/* global Colocs */
/* global SimpleSchema */

Colocs = new Mongo.Collection("colocs");

Colocs.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: "Nom de la coloc",
    max: 30,
    index: true,
    unique: true
  },
  description: {
    type: String,
    label: "Description rapide (optionnel)",
    optional: true
  },
  mates: {
    type: [String],
    regEx: SimpleSchema.RegEx.Id
  }
}));

Colocs.permit('insert').ifLoggedIn().ifIsNotInColoc().apply();
Colocs.permit('update').ifLoggedIn().ifIsNotInColoc().exceptProps(['title', 'description']).apply();