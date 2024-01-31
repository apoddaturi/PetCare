import axios from "axios";
import {Alert} from "@mui/material";

const API_URL = "http://localhost:8080/api/";

// Function to fetch User Id to use in verious functions
const getUserId = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if(!user) {
        Alert('No user logged in'); return;
    }
    return user.user.id;
}

//Create a new Event

const SaveEvent = async(NewEvent) =>{
    const options = {
        url: `${API_URL}event`,
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        data: NewEvent
    };

    const response = await axios(options);
    return response.data;
}

// Get all events

const AllEvents = async () =>{
    const response =await axios.get(`${API_URL}event/events/all/${getUserId()}`);
    return response.data;
};

//Get Particular user Events
const MyEvents = async() =>{
    const response =await axios.get(`${API_URL}event/events/user/${getUserId()}`);
    return response.data;
};

// GET call for fetching registered events

const RegisteredEvents = async() =>{
    const response =await axios.get(`${API_URL}event/events/reg/user/${getUserId()}`);
    return response.data;
};


// Event Registration

const RegisterEvent = async(eventId) =>{
    const regData = {user: getUserId(), event: eventId};
    const response  = await axios.post(`${API_URL}registration/registration`, regData);
    return response.data;
};

// unregister a specific event
const UnregisterEvent = async(eventId) =>{
    const regData = {user: getUserId(), event: eventId};
    const response  = await axios.delete(`${API_URL}registration/registration/${getUserId()}/${eventId}`, regData);
    return response.data;
};

// delete an event
const removeEvent = async (eventId) =>{
    const response = await axios.delete(`${API_URL}event/${eventId}`)
    return response.data;
}

// exporting all functions as eventService object to use it else where
const eventService = {
    SaveEvent,
    AllEvents,
    MyEvents,
    RegisteredEvents,
    RegisterEvent,
    UnregisterEvent,
    removeEvent,
}

export default eventService;