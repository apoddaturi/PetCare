import { useRef, useEffect, useState } from 'react';
import { Header } from "../../component";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EventList from '../../component/events/eventList/eventList';
import EventCreate from '../../component/events/eventCreate/eventCreate';
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import 'react-notifications/lib/notifications.css';
import './eventPage.scss';
import eventService from "../../features/events/eventService";

const EventPageComponent = () => {
    const { state } = useLocation();
	
    const searchTextRef = useRef(null);
    const [oAllEvents, setOAllEvents] = useState([]);
    const [oMyEvents, setOMyEvents] = useState([]);
    const [oRegEvents, setORegEvents] = useState([]);
    const [allEvents, setAllEvents] = useState([]);
    const [myEvents, setMyEvents] = useState([]);
    const [regEvents, setRegEvents] = useState([]);
    const [open, setOpen] = useState(false);
    const [searchText, setSearchText] = useState(null);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let localUser = JSON.parse(localStorage.getItem("user"));
	const dispatch = useDispatch();
	const { events } = useSelector((state) => state.allEvents) || {events:""};
	if(events) console.log(JSON.parse(events));

	// const initFetch = useCallback(() => {
	// 	dispatch(getEvents());
	// }, [dispatch]);
	// useEffect(() => {
	// 	initFetch();
	// }, [initFetch]);

    const onSearchTextChange = ()=>{
        console.log(searchTextRef.current.value, 'in search text');
        setSearchText(searchTextRef.current.value);
    }

    const fetchAllEvents = ()=>{
        eventService.AllEvents()
            .then(events=> {
                setAllEvents(events);
                setOAllEvents(events);
                return null;
                })
            .catch(e=> console.log(e))
    }
    const fetchMyEvents =()=>{

        eventService.MyEvents()
        .then(events=> {
            setMyEvents(events);
            setOMyEvents(events);
            return null;
        })
        .catch(e=> console.log(e))
    }

    const fetchRegEvents =()=>{

       eventService.RegisteredEvents()
        .then(
            events=> {
                setRegEvents(events);
                setORegEvents(events);
                return null;
            })
        .catch(e=> console.log(e))
    } 

    const refreshEventsPage = () => {
        fetchAllEvents();
        fetchMyEvents();
        fetchRegEvents();
    }

    useEffect(() =>{
        refreshEventsPage();
    },[open]);

    useEffect(() => {
        if(!searchText || !oAllEvents){
            setAllEvents(oAllEvents);
            setMyEvents(oMyEvents);
            setRegEvents(oRegEvents);
            return;
        }
        console.log('Search text ', searchText);
        const searchTxt = searchText.toUpperCase();
        setAllEvents(oAllEvents.filter(e => ((e.eventName.toUpperCase()).indexOf(searchTxt)!== -1 ||
            (e.eventDescription.toUpperCase()).indexOf(searchTxt)!== -1)));
        setMyEvents(oMyEvents.filter(e => ((e.eventName.toUpperCase()).indexOf(searchTxt)!== -1 ||
            (e.eventDescription.toUpperCase()).indexOf(searchTxt)!== -1)));
        setRegEvents(oRegEvents.filter(e => ((e.eventName.toUpperCase()).indexOf(searchTxt)!== -1 ||
            (e.eventDescription.toUpperCase()).indexOf(searchTxt)!== -1)));
    },[searchText]);

    return (
        <>
        <div className='events-main-container'>
            <div className='header-container w-100'>
                <div className='w-100'>
                    <h2>Events</h2>
                </div>
                <div className='input-container w-100'>
                    <input type='text' className='search-field' ref={searchTextRef} 
                        placeholder='Search Events' onChange={onSearchTextChange}/>
                    <button className='add-button' onClick={handleClickOpen}>Add New Event</button>
                </div>
                {
                    open &&
                    <EventCreate
                        handleClose={handleClose}
                        open={open}
                        
                    />
                }
            </div>
            <div>
                <h4 className='EventHeader'>All Events</h4>
                <hr />
                <EventList events={allEvents} refreshEventsPage={()=>refreshEventsPage()}>
                </EventList>
            </div>

            <h4 className='EventHeader'>My Events</h4>
            <hr />
            <EventList events={myEvents} refreshEventsPage={()=>refreshEventsPage()}></EventList>
            <h4 className='EventHeader'>Registered Events</h4>
            <hr/>
            <EventList events={regEvents} refreshEventsPage={()=>refreshEventsPage()}></EventList>
            {/* <h4 className='EventHeader'>External Events</h4> */}
        </div>
            <NotificationContainer/>
        </>
    );
}

export default EventPageComponent;