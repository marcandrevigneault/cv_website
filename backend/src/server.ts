import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import contentRouter from './routes/content'
import statsRouter from './routes/stats'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/api/content', contentRouter)
app.use('/api/stats', statsRouter)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`)
})