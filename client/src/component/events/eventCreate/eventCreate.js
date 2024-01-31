import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FileBase64 from 'react-file-base64';
import {useRef, useState} from 'react';
import eventService from "../../../features/events/eventService";

// functional component for event create model.
const EventCreate = (props) => {
    const {open, handleClose, event = {}} = props;
    const [image, setImage] = useState(event.image);
    let nameRef = useRef(event.eventName);
    let descriptionRef = useRef(event.eventDescription);
    let locationRef = useRef(event.eventLocation);
    let dateRef = useRef(event.eventDate);

    // handle create operation on handle 
    const handleCreate = (e) => {
        const userinfo = JSON.parse(localStorage.getItem("user"));
        const NewEvent = {
            _id: event? event._id : null,
                eventName: nameRef.current.value,
            eventDescription: descriptionRef.current.value,
            eventLocation: locationRef.value,
            eventDate:dateRef.value,
            image:image,
            createdBy: userinfo.user.id,
        }
        eventService.SaveEvent(NewEvent)
        .then(response => {
            handleClose();
            }).catch((e)=>{console.log(e)})
        
    };
    // converting date to show on clicking edit on event card
    const dateify = (num, ms = false) => {
        if(ms){
            if(num < 10) return `00${num}`;
            else if(num < 100) return `0${num}`;
            return num;
        }
        if(num < 10) return `0${num}`;
        return num;
    }
    const dateObj = new Date(event.eventDate);
    let eventDateVal = `${dateObj.getFullYear()}-${dateify(dateObj.getMonth())}-${dateify(dateObj.getDate())}T${dateify(dateObj.getHours())}:${dateify(dateObj.getMinutes())}:${dateify(dateObj.getSeconds())}.${dateify(dateObj.getMilliseconds(), true)}`;
    return (
    <Dialog open={open} onClose={handleClose}>
    <DialogTitle>New Event</DialogTitle>
    <DialogContent>
    <TextField
        autoFocus
        inputRef={nameRef}
        defaultValue={event.eventName}
        id="name"
        placeholder='Event Name'
        margin="dense"
        label="Event Name"
        type="text"
        fullWidth
        required
        variant="standard"
    />
    <TextField
        autoFocus
        inputRef={descriptionRef}
        defaultValue={event.eventDescription}
        margin="dense"
        id="description"
        label="Event Description"
        placeholder='Event Description'
        type="text"
        fullWidth
        required
        variant="standard"
    />
    <TextField
        autoFocus
        inputRef={ref => locationRef = ref}
        defaultValue={event.eventLocation}
        margin="dense"
        id="location"
        label="Event Location"
        type="Location"
        fullWidth
        required
        variant="standard"
    />
    <TextField
        autoFocus
        inputRef={ref => dateRef = ref}
        defaultValue={eventDateVal}
        margin="dense"
        id="date"
        label=" "
        fullWidth
        required
        type="datetime-local"
        variant="standard"
    />
    {
        event.image &&  <><img src={event.image} alt={event.name} /><br></br></>
    }
    <FileBase64  onDone={({base64}) => {setImage(base64)}}/>
    </DialogContent>
    <DialogActions>
    <Button onClick={handleClose}>Cancel</Button>
    <Button onClick={handleCreate}>{event._id ? 'Save' : 'Add'}</Button>
    </DialogActions>
</Dialog>
    )
}

export default EventCreate;