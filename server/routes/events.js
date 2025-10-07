import express from 'express'
import EventsController from '../controllers/events.js'

const router = express.Router()

router.get('/', EventsController.getEvents)


router.get('/locations', EventsController.getUniqueLocations)


router.get('/:id', EventsController.getEventById)


router.get('/location/:location', EventsController.getEventsByLocation)

export default router