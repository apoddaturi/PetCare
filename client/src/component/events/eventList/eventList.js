import React from 'react';
import './eventList.scss';
import EventCard from '../eventCard/eventCard.js';
import PropTypes from "prop-types";

const mapStateToProps = (state) => ({
    events : state.events
})
// EVent list component to arrange list of events comming from server.
class EventsList extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        const events =  this.props.events && this.props.events.length ? this.props.events
            .map((e,i) => <EventCard key={i} event={e}
                                     refreshEventsPage={()=>this.props.refreshEventsPage()}>
            </EventCard>) : [];

        return (
            <>{
                events.length ?
                    <div className='grid-Layout'>
                        {events}
                    </div>
                :   <div className='no-events-container'>
                        No Events Available
                    </div>
                }
            </>
        );
    }
}

EventsList.propTypes = {
    events: PropTypes.array,
    refreshEventsPage: PropTypes.func
}
// const EventList = connect(mapStateToProps)(EventsListComponent);
export default EventsList;