const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // this ensures the uniqueness of username
  },
  name: String,
  passwordHash: String,
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Note",
    },
  ],
});

//This code snippet customizes how a Mongoose document is converted into a plain JavaScript object,
//usually just before it's sent as a JSON response from a server (like an API).
//Think of the userSchema as the blueprint for creating a user record in a database.
//this setting ensures that any user data you send out is standardized, easy to use,
//and free of internal database clutter like _id and __v.
userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    //The passwordHard should not be revealed
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model("User", userSchema);

//1 - way of exporting modules
module.exports = User;

//2 - way of exporting modules
// module.exports = mongoose.model("User", userSchema);
