var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use("/scripts_web3", express.static(__dirname + "/node_modules/web3.js-browser/build/"))

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

//mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:CuXvXblP8dON7lDG@cluster0.symnm.mongodb.net/minigame?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
    if (err) {
        console.log('Mongo connection error! - ' + err);
    } else {
        console.log('Mongo connected');
    }
});


require("./controllers/game")(app)