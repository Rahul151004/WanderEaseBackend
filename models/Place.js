const mongoose = require("mongoose");

const PlaceSchema = mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    pickPath: {
      type: String,
      required: true,
    },
    price: Number,
    bed: Number,
    bath: Number,
    size: Number,
    isGarage: Boolean,
    score: Number,
    localAttraction: String,
    itinerary: String,
  },
  { timestamps: true }
);

const Place = mongoose.model('Place', PlaceSchema);
module.exports = Place;
