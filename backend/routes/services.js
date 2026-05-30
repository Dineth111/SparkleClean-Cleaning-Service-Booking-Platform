const express = require('express')
const Service = require('../models/Service')
const adminAuth = require('../middleware/adminAuth')
const upload = require('../middleware/upload')
const multer = require('multer')
const path = require('path')

const router = express.Router()

// Serve uploaded images
router.use('/uploads', express.static(path.join(__dirname, '../uploads')))

// Public route - get all services
router.get('/', async (_req, res) => {
  try {
    const services = await Service.find().sort({ _id: 1 })
    res.json(services)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch services.' })
  }
})

// Admin routes - protected
router.post('/', adminAuth, upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, imageUrl, category } = req.body
    
    if (!name || !description || !price) {
      return res.status(400).json({ message: 'Name, description, and price are required.' })
    }
    
    // Use uploaded file URL if available, otherwise use provided imageUrl
    let finalImageUrl = imageUrl || ''
    if (req.file) {
      finalImageUrl = `/api/services/uploads/${req.file.filename}`
    }
    
    const service = await Service.create({
      name,
      description,
      price: Number(price),
      imageUrl: finalImageUrl,
      category: category || '',
    })
    
    res.status(201).json(service)
  } catch (error) {
    console.error('Create service error:', error)
    res.status(500).json({ message: error.message || 'Failed to create service.' })
  }
})

// Error handling middleware for multer
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File size too large. Maximum size is 5MB.' })
    }
    return res.status(400).json({ message: error.message })
  } else if (error) {
    return res.status(400).json({ message: error.message })
  }
  next()
})

router.put('/:id', adminAuth, upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, imageUrl, category } = req.body
    
    // Use uploaded file URL if available, otherwise keep existing or use provided imageUrl
    let finalImageUrl = imageUrl
    if (req.file) {
      finalImageUrl = `/api/services/uploads/${req.file.filename}`
    }
    
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { name, description, price: Number(price), imageUrl: finalImageUrl, category },
      { new: true },
    )
    
    if (!service) return res.status(404).json({ message: 'Service not found.' })
    res.json(service)
  } catch (error) {
    console.error('Update service error:', error)
    res.status(500).json({ message: error.message || 'Failed to update service.' })
  }
})

router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id)
    if (!service) return res.status(404).json({ message: 'Service not found.' })
    res.json({ message: 'Service deleted successfully.' })
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete service.' })
  }
})

module.exports = router
