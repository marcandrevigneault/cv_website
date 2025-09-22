import { Router } from 'express'
import fs from 'fs/promises'
import path from 'path'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const contentPath = path.join(__dirname, '../../data/content.json')
    const content = await fs.readFile(contentPath, 'utf-8')
    res.json(JSON.parse(content))
  } catch (error) {
    res.status(500).json({ error: 'Failed to load content' })
  }
})

router.post('/', async (req, res) => {
  try {
    const contentPath = path.join(__dirname, '../../data/content.json')
    await fs.writeFile(contentPath, JSON.stringify(req.body, null, 2))
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: 'Failed to save content' })
  }
})

export default router