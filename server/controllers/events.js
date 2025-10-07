import { pool } from '../config/database.js'

const getEvents = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM events_tb ORDER BY id ASC')
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const getEventById = async (req, res) => {
    try {
        const eventId = req.params.id
        const results = await pool.query('SELECT * FROM events_tb WHERE id = $1', [eventId])
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const getEventsByLocation = async (req, res) => {
    try {
        const location = req.params.location
        const results = await pool.query('SELECT * FROM events_tb WHERE location = $1 ORDER BY id ASC', [location])
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const getUniqueLocations = async (req, res) => {
    try {
        const results = await pool.query('SELECT DISTINCT location, address, city, state, zip FROM events_tb ORDER BY location ASC')
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

export default {
    getEvents,
    getEventById,
    getEventsByLocation,
    getUniqueLocations
}