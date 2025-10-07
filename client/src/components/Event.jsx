import React, { useState, useEffect } from 'react'
import EventsAPI from '../services/EventsAPI'  
import '../css/Event.css'

const Event = (props) => {

    const [event, setEvent] = useState({})  

    useEffect(() => {
        (async () => {
            try {
                const eventData = await EventsAPI.getEventById(props.id)  
                setEvent(eventData)
            }
            catch (error) {
                console.error('Error fetching event:', error)  
            }
        }) ()
    }, [props.id])  

    const formatTime = (timeString) => {
        if (!timeString) return ''
        const timeParts = timeString.split(':')
        if (timeParts.length >= 2) {
            const hours = parseInt(timeParts[0])
            const minutes = timeParts[1]
            const ampm = hours >= 12 ? 'PM' : 'AM'
            const displayHours = hours % 12 || 12
            return `${displayHours}:${minutes} ${ampm}`
        }
        return timeString
    }


    const formatDate = (dateString) => {
        if (!dateString) return ''
        const date = new Date(dateString)
        return date.toLocaleDateString()
    }



    return (
        <article className='event-information'>
            <img src={event.image || props.image || '/party.png'} alt={event.title} />  {/* ADD: fallback image and alt */}

            <div className='event-information-overlay'>
                <div className='text'>
                    <h3>{event.title || props.title}</h3>  
                    <p>
                        <i className="fa-regular fa-calendar fa-bounce"></i> 
                        {formatDate(event.date || props.date)} <br />  
                        {formatTime(event.time || props.time)}  
                    </p>
                </div>
            </div>
        </article>
    )
}

export default Event