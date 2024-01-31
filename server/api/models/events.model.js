const mongoose = require('mongoose');

mongoose.set('debug',true);

// creating a model schema that reflects the fields that are necessary for each event.
const Schema = new mongoose.Schema({
    eventName:{
        type: String,
        required:true
    },
    eventDescription:{
        type:String,
        required: true
    },
    eventLocation:{
        type:String,
        required: true
    },
    image: {
        type:String,
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        required:true
    },
    eventDate:{
        type: Date,
        required:true
    },
    isRegistered:{
        type: Boolean,
    },
    createdDate:{
        type: Date,
        default: Date.now
    },
    modifiedDate:{
        type: Date,
        default: Date.now
    }
});
module.exports = (mongoose) => mongoose.model('event', Schema);
