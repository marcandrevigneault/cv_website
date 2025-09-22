import { Router } from 'express'

const router = Router()

router.get('/world-stats', async (req, res) => {
  const mockStats = {
    population: 8000000000,
    internetUsers: 5400000000,
    co2Emissions: 36800000000,
    timestamp: new Date().toISOString()
  }
  res.json(mockStats)
})

router.get('/random-fact', async (req, res) => {
  const facts = [
    { category: 'physics', fact: 'A teaspoonful of neutron star would weigh 6 billion tons' },
    { category: 'tech', fact: 'The first computer bug was an actual bug stuck in a relay' },
    { category: 'space', fact: 'One day on Venus equals 243 Earth days' }
  ]
  const randomFact = facts[Math.floor(Math.random() * facts.length)]
  res.json(randomFact)
})

export default router