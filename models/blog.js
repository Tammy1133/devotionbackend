const mongoose = require("mongoose");

const BlogSchema = mongoose.Schema({
  date: {
    type: String,
  },
  image: {
    type: String,
  },
  title: {
    type: String,
  },
  intro: {
    type: String,
  },
  details: {
    type: String,
  },
});

const BlogModel = mongoose.model("blog", BlogSchema);
module.exports = BlogModel;
