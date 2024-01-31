const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.users = require("./user.model.js")(mongoose);
db.posts = require("./post.model.js")(mongoose);
db.events = require("./events.model.js")(mongoose);
db.registration = require("./registration.model.js")(mongoose);
module.exports = db;
