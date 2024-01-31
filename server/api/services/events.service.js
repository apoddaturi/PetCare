const db = require("../models");
const Events = db.events;
const Registrations = db.registration;
const {getRegistrationByUserAndEvent} = require("./registration.service");

// save new event
exports.saveNewEvent = async (event) =>{
    if(event._id){
        event._id = db.mongoose.Types.ObjectId(event._id);
        return await Events.findByIdAndUpdate(event._id, event, {upsert: true}).exec();
    }
    const newEvent = new Events(event);
    return newEvent.save();
}

// get user events
exports.getUserEvents = async (id) =>{
    const allEvents = await Events.find({HostId:id});
    return allEvents;
}

// exports.getAllEvents = async (req,res) =>{
//     const userId = req.params.userId;
//     let allEvents = await Events.find({});
//     console.log('Events = ',allEvents);
//     return allEvents;
// }

// get all events irrespective of user
exports.getAllEvents = async (userId) => {
    let allEvents = await Events.find({});
    allEvents = await Promise.all(allEvents.map(eve => {
        return new Promise(async (res, rej) => {
            const reg = await getRegistrationByUserAndEvent(userId, (eve._id).toString());
            if (reg && reg._id) {
                eve.isRegistered = true;
            }
            res(eve);
        });
    }));
    return allEvents;
}

// get a user specific events
exports.getMyEvents = async (userId) => {
    const userObjId = db.mongoose.Types.ObjectId(userId);
    let myEvents = await Events.find({createdBy: userObjId});
    // let augMyEvents = [];
    myEvents = await Promise.all(myEvents.map(eve => {
        return new Promise(async (res,rej) => {
            const reg = await getRegistrationByUserAndEvent(userId, (eve._id).toString());
            if(reg && reg._id) {
                eve.isRegistered = true;
            }
            res(eve);
        })
    }));
    return myEvents;
}

// get registered events
exports.getRegisteredEvents = async (userId) => {
    const regs = await Registrations.find({user:userId});
    const regEventIds = regs.map(reg => reg.event.toString());
    let events = await Events.find({});
    events = events.filter(event => {
        return regEventIds.includes(event._id.toString());
    }).map(event => {event.isRegistered = true; return event});
    return events;
}

// get specific event
exports.getEvent = async({eventId}) => {
    const event = await Events.find({_id: eventId}).exec();
    return event;
}

// delete user event
exports.deleteUserEvent = async(eventId) =>{
    console.log('inside service layer');
    console.log(eventId);
    return Events.findOneAndRemove({_id: db.mongoose.Types.ObjectId(eventId)});
}