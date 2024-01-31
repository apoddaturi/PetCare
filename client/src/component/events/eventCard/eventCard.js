import * as React from 'react';
import './eventCard.scss';
import EventCreate from '../eventCreate/eventCreate';
import PropTypes from "prop-types";
import {NotificationManager} from "react-notifications";
import editicon from '../../../assets/images/icons8-pencil-25 _brickred.png';
import delIcon from '../../../assets/images/icons8-remove-25.png';
import eventService from "../../../features/events/eventService";

class EventCard extends React.Component {
// Event Card Component to display event details and other actions
  
  constructor(props){
    super(props);
    this.state = {isEdit:false}
    this.handleClose = this.handleClose.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleEditEvent = this.handleEditEvent.bind(this);
    this.handleUnRegister = this.handleUnRegister.bind(this);
  }

  // to refresh events upon update
  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevState.isEdit !== this.state.isEdit) {
      this.props.refreshEventsPage();
    }
  }

  // handle register event on card
  handleRegister = ()=>{
    eventService.RegisterEvent(this.props.event._id).then(()=> {
      this.props.refreshEventsPage();
      NotificationManager.success('Registered Event Successfully.',null, 2000);
    })
    .catch(e=> console.log(e))
  }

  // handle unregister event on card 
  handleUnRegister = ()=>{
    eventService.UnregisterEvent(this.props.event._id)
        .then(()=> {
          this.props.refreshEventsPage();
          NotificationManager.success('Unregistered Event Successfully.');
        })
        .catch(e=> console.log(e))
  }
  
  // handle edit event on the card to set model state
  handleEditEvent=()=>{
    this.setState({isEdit:true});
  }
  handleClose=()=>{
    this.setState({isEdit:false});
  }
  // handle delete event action
  handleDeleteEvent=()=>{
    eventService.removeEvent(this.props.event._id)
        .then(()=> {
      this.props.refreshEventsPage();
    })
        .catch(e=> console.log(e))
  }

  // Check owner function to conditionally render options on the event cards 
  checkOwner=()=>{
    const userId = JSON.parse(localStorage.getItem("user")).user.id;
    if (this.props.event.createdBy === userId){return true;}
    return false;
  }
  render(){
    const image = this.props && this.props.event && this.props.event.image;
    if(this.props.event) {
    return(
    <>
    <EventCreate 
      open ={this.state.isEdit}
      handleClose={this.handleClose}
      event={this.props.event}
      
    />
    <div className='event-card-container'>
      <div className="event-card">
        <div className="event-card-profile">
          <div className='image-container'>
            <img className="event-card-image" src={image ? image : "https://media.istockphoto.com/id/1224927400/photo/happy-woman-embracing-beagle-dog-in-park.jpg?s=612x612&w=0&k=20&c=U4YFNK_Vqanj4IL-K-s4eGD4_LKqMIyx2Im4Ojcar4c=" }alt="dog-image" />
          </div>
          <div className='details-container'>
            <div className="event-card-details">
              <p className="event-card-detail-event-name">
                {this.props.event.eventName}  
              </p>
              <p className="event-card-detail-description">
                {this.props.event.eventDescription}
              </p>
              <p className="event-card-detail-location">
                {this.props.event.eventLocation}
              </p>
              <p className="event-card-detail-date">
                {this.props.event.eventDate}
              </p>
            </div>
            <div className='event-card-actions-container'>
                {
                  this.props.event.isRegistered ?
                  <span className='event-card-action' onClick={this.handleUnRegister}> Unregister </span> :
                  <span className='event-card-action' onClick={this.handleRegister}> Register </span>
                }
                {this.checkOwner()?
                    <span className='event-card-action event-card-ed' onClick={this.handleEditEvent}> <img src={editicon}></img> </span>
                :null}
                {this.checkOwner()?
                <span className='event-card-action event-card-ed' onClick={this.handleDeleteEvent.bind(this)}> <img src={delIcon}></img> </span>
                :null}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
      );
    }
  }
}

// default props to the event card
EventCard.defaultProps = {
  event: {},
  refreshEventsPage: () => {}
}

EventCard.propTypes = {
  event: PropTypes.object,
  refreshEventsPage: PropTypes.func
}

export default EventCard;
