const getAllEvents = async () => {
    try {
        const response = await fetch('/api/events')
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching events:', error)
        return []
    }
}


const getEventById = async (id) => {
    try {
        const response = await fetch(`/api/events/${id}`)
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching event:', error)
        return null
    }
} 

export default {
    getAllEvents,
    getEventById
}