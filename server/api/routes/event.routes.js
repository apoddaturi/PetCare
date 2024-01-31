const eventController = require("../controllers/event.controller");
module.exports = app => {
const eventController = require("../controllers/event.controller");
const router = require("express").Router();

// For specific event routes
// create new event
router.post('/', eventController.postEvent);
// get a specific event
router.get('/events/:eventId', eventController.getEvent);
// delete a specific event
router.delete('/:eventId', eventController.delEvent);

// For all the events
// get all the events 
router.get('/events/all/:userId', eventController.getAllEvents);
// get specific user events
router.get('/events/user/:userId', eventController.getMyEvents);
// registered events for a user
router.get('/events/reg/user/:userId', eventController.getRegisteredEvents);
app.use("/api/event", router);

}