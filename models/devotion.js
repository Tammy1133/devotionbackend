const mongoose = require("mongoose");

const DevotionSchema = mongoose.Schema({
  date: {
    type: String,
  },
  verse: {
    type: String,
  },
  title: {
    type: String,
  },
  versedetails: {
    type: String,
  },
  word: {
    type: String,
  },
  prayer: {
    type: String,
  },
});

const BlogModel = mongoose.model("devotion", DevotionSchema);
module.exports = BlogModel;
