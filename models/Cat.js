const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const catSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    min: 4,
  },
  neutered: Boolean,
  colors: {
    type: String,
    enum: ["black", "white", "orange"],
  },
});

catSchema.plugin(uniqueValidator);
const Cat = mongoose.model("Cat", catSchema);

module.exports = Cat;
