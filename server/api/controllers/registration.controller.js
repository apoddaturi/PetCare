const RegistrationService = require('../services/registration.service.js');

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

// For creating a new registration
exports.postRegistration = async(request,response) =>{
    try{
        const payload = request.body;
        const  registration = await RegistrationService.saveNewRegistration(payload);
        setSaveResponse(registration,response);  
    }catch(error){
        setErrorResponse(error,response);
    }
}

// For deleting a registration
exports.deleteRegistration = async (req, res) => {
    try{
        const result = RegistrationService.deleteRegistration(req.params.userId, req.params.eventId);
        setSaveResponse(result, res);
    } catch(e){setErrorResponse(e, res);}
}

// for getting specific user registration
exports.getMyregistrations = async (req, res) => {
    try{
        const myRegistrationss = await RegistrationService.getMyRegistrations(req.params.userId)
        setSuccessResponse(myRegistrationss, res);
    } catch (error) {
        setErrorResponse(error, res);
    }
}