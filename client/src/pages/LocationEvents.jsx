import React, { useState, useEffect } from 'react'
import Event from '../components/Event'
import EventsAPI from '../services/EventsAPI'
import LocationsAPI from '../services/LocationsAPI'
import '../css/LocationEvents.css'

const LocationEvents = ({index}) => {
    const [location, setLocation] = useState({})
    const [events, setEvents] = useState([])

    
    const locationMap = {
        1: 'Beachside Pavilion',           // echolounge route
        2: 'Historic Theater',              // houseofblues route
        3: 'Rooftop Garden Lounge',        // pavilion route
        4: 'Tech Hub Conference Center'    // americanairlines route
    }

    useEffect(() => {
        const fetchLocationAndEvents = async () => {
            try {
                
                const locationName = locationMap[index]
                
                
                const locationsData = await LocationsAPI.getAllLocations()
                const currentLocation = locationsData.find(loc => loc.location === locationName)
                
                if (currentLocation) {
                    setLocation(currentLocation)
                    
                    const allEvents = await EventsAPI.getAllEvents()
                    const locationEvents = allEvents.filter(event => event.location === locationName)
                    setEvents(locationEvents)
                }
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchLocationAndEvents()
    }, [index])

    return (
        <div className='location-events'>
            <header>
                {/* <div className='location-image'>
                    <img src={location.image || 'https://placehold.co/600x400'} alt={location.location} />
                </div> */}

                <div className='location-info'>
                    <h2>{location.location}</h2>
                    <p>{location.address}, {location.city}, {location.state} {location.zip}</p>
                </div>
            </header>

            <main>
                {
                    events && events.length > 0 ? events.map((event) =>
                        <Event
                            key={event.id}
                            id={event.id}
                            title={event.title}
                            date={event.date}
                            time={event.time}
                            image={event.image}
                        />
                    ) : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No events scheduled at this location yet!'}</h2>
                }
            </main>
        </div>
    )
}

export default LocationEvents
