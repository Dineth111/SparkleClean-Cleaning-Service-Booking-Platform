const express = require('express')
const Service = require('../models/Service')

const router = express.Router()

router.get('/', async (_req, res) => {
  try {
    const services = await Service.find().sort({ _id: 1 })
    res.json(services)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch services.' })
  }
})

module.exports = router
