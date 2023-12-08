const mongoose = require("mongoose");

const TestimonialSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});
const Testimonial =
  mongoose.models?.Testimonial ||
  mongoose.model("Testimonial", TestimonialSchema);

module.exports = Testimonial;
