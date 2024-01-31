const eventService = require('../services/events.service.js');

// Response functions for success and failure cases
const setSuccessResponse = (obj, response) =>{
    response.status=200;
    response.json(obj);
}

const setSaveResponse = (obj, response) =>{
    response.status=201;
    response.json(obj);
}

const setErrorResponse = (Error, response) =>{
    response.status=500;
    response.json(Error);
}

//respective controller events

// For creating a new todo
exports.postEvent = async(request,response) =>{
    try{
        const payload = request.body;
        const event = await eventService.saveNewEvent(payload);
        setSaveResponse(event,response);
    }catch(error){
        setErrorResponse(error,response);
    }
}

// for getting all events

exports.getAllEvents = async (request, response) => {
    try{
        const todos = await eventService.getAllEvents(request.params.userId);
        setSuccessResponse(todos, response);
    }
    catch(error){
        setErrorResponse(error, response);
    } 
}

// getting a specific user events

exports.getMyEvents = async (req, res) => {
    try{
        const myEvents = await eventService.getMyEvents(req.params.userId)
        setSuccessResponse(myEvents, res);
    } catch (error) {
        setErrorResponse(error, res);
    }
}

// Getting specific user registered events
exports.getRegisteredEvents = async(req,res)=>{
    try{
        const regEvents = await eventService.getRegisteredEvents(req.params.userId);
        setSuccessResponse(regEvents, res);
    } catch (error) {
        setErrorResponse(error, res);
    }
}

// Getting specific event
exports.getEvent = async (request, response) => {
    try{
        const query = {};
        const todos = await eventService.getEvent(query);
        setSuccessResponse(todos, response);
    }
    catch(error){
        setErrorResponse(error, response);
    } 
}

// Delete specific event
exports.delEvent =async (request,response) =>{
    try{
        console.log('inside controller layer');
        const result = await eventService.deleteUserEvent(request.params.eventId);
        setSuccessResponse(result,response);
    }catch(e)
    {
        setErrorResponse(e,response);
    }
}