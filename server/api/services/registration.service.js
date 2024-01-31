const db = require("../models");
const Registrations = db.registration;

// get user and event combinations
exports.getRegistrationByUserAndEvent = async (user, event = null) => {
    const ObjectId = id => db.mongoose.Types.ObjectId(id);
    const query = {user: ObjectId(user)};
    if(event) query.event = ObjectId(event);
    const reg = await Registrations.find(query);
    return reg.length ? reg[0] : {};
}

exports.getRegistrationsByUser = async ({user}) => {
    
}

// get registrations for a id
exports.getRegistration = async (regId) => {
    const regObjId = db.mongoose.Types.ObjectId(regId);
    const registration = await Registrations.find({_id: regObjId});
    return registration;
}

// save new registration
exports.saveNewRegistration = async (reg) =>{
    const prevReg = await this.getRegistrationByUserAndEvent(reg.user, reg.event);
    if(prevReg && prevReg.length && prevReg.length !== 0){
        return null;
    }
    const newRegistration = new Registrations(reg);
    return newRegistration.save();
}

// delete a specific registration.
exports.deleteRegistration = async (userId, eventId) => {
    return Registrations.findOneAndRemove({user: db.mongoose.Types.ObjectId(userId), event: db.mongoose.Types.ObjectId(eventId)});
}