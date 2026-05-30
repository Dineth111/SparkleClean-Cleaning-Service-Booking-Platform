const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const serviceRoutes = require('./routes/services')
const bookingRoutes = require('./routes/bookings')
const seedServices = require('./seed/seedServices')

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/services', serviceRoutes)
app.use('/api/bookings', bookingRoutes)

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connected.')
    await seedServices()
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error.message)
    process.exit(1)
  }
}

startServer()
