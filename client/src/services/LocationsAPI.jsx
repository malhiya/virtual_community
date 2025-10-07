const API_BASE_URL = '/api/events'

const getAllLocations = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/locations`)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching locations:', error)
        return []
    }
}

const getEventsByLocation = async (location) => {
    try {
        const response = await fetch(`${API_BASE_URL}/location/${encodeURIComponent(location)}`)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching events by location:', error)
        return []
    }
}

const getLocationByName = async (locationName) => {
    try {
        const locations = await getAllLocations()
        return locations.find(loc => loc.location === locationName) || null
    } catch (error) {
        console.error('Error fetching location by name:', error)
        return null
    }
}

export default {
    getAllLocations,
    getEventsByLocation,
    getLocationByName
}