const mongoose = require('mongoose')
require('dotenv').config()

const Service = require('./models/Service')

async function checkDB() {
  try {
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI
    
    if (!mongoUri) {
      console.error('❌ MongoDB URI not found in .env file')
      process.exit(1)
    }
    
    await mongoose.connect(mongoUri)
    console.log('✅ Connected to MongoDB')
    
    const services = await Service.find({}).lean()
    
    console.log('\n=== SERVICES IN DATABASE ===')
    console.log(`Total services: ${services.length}\n`)
    
    if (services.length === 0) {
      console.log('⚠️  No services found in database')
    } else {
      services.forEach((service, index) => {
        console.log(`${index + 1}. ${service.name}`)
        console.log(`   Description: ${service.description}`)
        console.log(`   Price: $${service.price}`)
        console.log(`   Category: ${service.category || 'N/A'}`)
        console.log(`   Image: ${service.imageUrl || 'No image'}`)
        console.log(`   ID: ${service._id}`)
        console.log('')
      })
    }
    
    await mongoose.connection.close()
    console.log('\n✅ Database check complete')
  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

checkDB()
