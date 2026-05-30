const Service = require('../models/Service')

const services = [
  {
    name: 'Deep Clean',
    description: 'Full home deep cleaning service',
    price: 120,
    category: 'Home',
    imageUrl: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Office Cleaning',
    description: 'Professional office sanitization',
    price: 150,
    category: 'Office',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Sofa Express',
    description: 'Sofa and upholstery cleaning',
    price: 60,
    category: 'Furniture',
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Carpet Cleaning',
    description: 'Deep carpet stain removal',
    price: 80,
    category: 'Floor',
    imageUrl: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Window Cleaning',
    description: 'Streak-free window and glass cleaning',
    price: 50,
    category: 'Glass',
    imageUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Kitchen Clean',
    description: 'Degreasing and full kitchen cleaning',
    price: 70,
    category: 'Kitchen',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Post-Move Clean',
    description: 'After move-out full property cleaning',
    price: 200,
    category: 'Move Out',
    imageUrl: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Bathroom Sanitize',
    description: 'Deep bathroom disinfection service',
    price: 45,
    category: 'Bathroom',
    imageUrl: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=900&q=80',
  },
]

async function seedServices() {
  const count = await Service.countDocuments()
  if (count === 0) {
    await Service.insertMany(services)
    console.log('Seeded 8 default services.')
  }
}

module.exports = seedServices
