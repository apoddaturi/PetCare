const express = require('express');
const cors  = require('cors');
const db  = require('./models/index.js');

const app = express();
app.use(
	cors({
		origin: "*",
	})
);
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

db.mongoose
	.connect(db.url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Connected to the database!");
	})
	.catch((err) => {
		console.log("Cannot connect to the database!", err);
		process.exit();
	});

// simple route
app.get("/", (req, res) => {
	res.json({ message: "Welcome to Dog application." });
});

const userRoutes = require("./routes/user.routes");
const eventRoutes = require("./routes/event.routes");
const registrationRoutes = require("./routes/registration.routes");

userRoutes(app);
eventRoutes(app);
registrationRoutes(app);

module.exports = app;