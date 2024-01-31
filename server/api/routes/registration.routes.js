module.exports = app => {
const registrationController = require("../controllers/registration.controller");
const router = require("express").Router();

// create new registration
router.post('/registration', registrationController.postRegistration);
// delete registrations
router.delete('/registration/:userId/:eventId', registrationController.deleteRegistration);
// get a specific registration.
router.get('/registration/:registrationId', registrationController.getMyregistrations);
app.use("/api/registration", router);

}