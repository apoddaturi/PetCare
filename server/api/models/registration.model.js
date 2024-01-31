const mongoose = require('mongoose');

mongoose.set('debug',true);

// creating a model schema that reflects the fields that are necessary for each event.
const Schema = new mongoose.Schema({
    user:{
        type: mongoose.Types.ObjectId,
        required:true
    },
    event:{
        type: mongoose.Types.ObjectId,
        required: true
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
module.exports = (mongoose) => mongoose.model('registration', Schema);
