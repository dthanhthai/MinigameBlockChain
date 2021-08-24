const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    phonenumber: String,
    isPaid: Boolean,
    walletNumber: String,
    date: Date
});
module.exports = mongoose.model("User", userSchema);