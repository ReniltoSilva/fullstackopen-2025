const mongoose = require("mongoose");
// const config = require("../utils/config");
// require("dotenv").config();

mongoose.set("strictQuery", false);
// console.log("connecting to", config.MONGODB_URI);

//NOW 'app.js' is responsible for stablishing the connection with the database
// mongoose
//   .connect(config.MONGODB_URI)
//   .then((result) => {
//     console.log("connected to MongoDB");
//   })
//   .catch((error) => {
//     console.log("error connecting to MongoDB:", error.message);
//   });

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: [5, "Required min 5 characters, got only {VALUE}"],
    required: true,
  },
  important: Boolean,

  // content: String,
  // important: Boolean,
});

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Note", noteSchema);
