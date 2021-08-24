const User = require("../models/User");
var user = require("../models/User");

module.exports = function (app) {

    app.get("/", function (req, res) {
        res.render("layout");
    });

    app.post("/register", function (req, res) {
        if (!req.body.email || !req.body.name || !req.body.phonenumber) {
            res.json({ status: 0, error: "Missing data!" });
        } else {
            var newUser = new User({
                email: req.body.email,
                name: req.body.name,
                phonenumber: req.body.phonenumber,
                isPaid: false,
                walletNumber: "",
                date: Date.now()
            });
            newUser.save(function (err) {
                if (err) {
                    res.json({ status: 0, error: "MongoDB save error" });
                } else {
                    res.json({ status: 1, result: newUser });
                }
            });
        }
    });

}