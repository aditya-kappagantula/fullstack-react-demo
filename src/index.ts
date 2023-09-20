import express, { Request, Response, NextFunction } from 'express'
import path from 'path'

const app = express()

app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req: Request, res: Response, next: NextFunction): void => {
  try {
    res.send('index.html')
  } catch (error) {
    next(error)
  }
})

app.get('/api/name', (req: Request, res: Response, next: NextFunction): void => {
  try {
    res.send({ value: 'Aditya K' })
  } catch (error) {
    next(error)
  }
})

const PORT = 3000

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})

process.once('SIGUSR2', () => process.kill(process.pid, 'SIGUSR2'))
process.on('SIGINT', () => process.kill(process.pid, 'SIGINT'))
