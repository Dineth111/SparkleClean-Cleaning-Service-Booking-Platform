const express = require('express')
const Booking = require('../models/Booking')
const Service = require('../models/Service')
const adminAuth = require('../middleware/adminAuth')

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const required = ['serviceId', 'serviceName', 'customerName', 'email', 'phone', 'address', 'date', 'time']
    const missing = required.find((field) => !req.body[field])
    if (missing) {
      return res.status(400).json({ message: `Missing required field: ${missing}` })
    }

    const serviceExists = await Service.findById(req.body.serviceId)
    if (!serviceExists) {
      return res.status(400).json({ message: 'Invalid service selected.' })
    }

    const booking = await Booking.create(req.body)
    res.status(201).json(booking)
  } catch (error) {
    res.status(500).json({ message: 'Failed to create booking.' })
  }
})

router.get('/', adminAuth, async (_req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 })
    res.json(bookings)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch bookings.' })
  }
})

router.patch('/:id', adminAuth, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: 'completed' },
      { new: true },
    )
    if (!booking) return res.status(404).json({ message: 'Booking not found.' })
    res.json(booking)
  } catch (error) {
    res.status(500).json({ message: 'Failed to update booking.' })
  }
})

router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id)
    if (!booking) return res.status(404).json({ message: 'Booking not found.' })
    res.json({ message: 'Booking deleted successfully.' })
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete booking.' })
  }
})

module.exports = router
