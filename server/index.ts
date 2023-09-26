import express, { Request, Response, NextFunction } from 'express'
import path from 'path'
import session from 'express-session'
import os from 'os'
import requestIp from 'request-ip'
import createMemoryStore from 'memorystore'
import batteries from './data/batteries'
import transformer from './data/transformer'
import ISelectOption from '../types/ISelectOption'

const MemoryStore = createMemoryStore(session)
const memoryStoreInstance = new MemoryStore({
  checkPeriod: 86400000 // prune expired entries every 24h
})
declare module 'express-session' {
  export interface SessionData {
    clientIPAddress: string | null,
    selectedBatteries: ISelectOption[]
  }
}

const PORT = process.env.PORT || 8000
const app = express()
const router = require('express').Router()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const getSession = (req: Request, res: Response, next: NextFunction) => {
  const ipAddress = requestIp.getClientIp(req)
  if (ipAddress) {
    memoryStoreInstance.get(ipAddress, (error, session) => {
      if (error) {
        console.error(error)
        next()
      }
      if (!session) {
        memoryStoreInstance.set(
          ipAddress,
          {
            cookie: {
              originalMaxAge: null
            },
            selectedBatteries: [],
            clientIPAddress: ipAddress
          }
        )
        next()
      }
      if (session) {
        res.locals.session = session
        next()
      }
    })
  }
}

const saveSession = (req: Request, res: Response, next: NextFunction) => {
  const ipAddress = requestIp.getClientIp(req)
  if (ipAddress) {
    memoryStoreInstance.set(
      ipAddress,
      {
        cookie: {
          originalMaxAge: null
        },
        selectedBatteries: req.body,
        clientIPAddress: ipAddress
      }
    )
  }
  next()
}

const ASSET_DIRECTORY = process.env.NODE_ENV === 'production' ? path.join(__dirname, '../../public') : path.join(__dirname, '../public')
const INDEX_FILE = `${ASSET_DIRECTORY}/index.html`
app.use(express.static(ASSET_DIRECTORY))
router.get('/', (req: Request, res: Response, next: NextFunction): void => {
  try {
    res.sendFile(INDEX_FILE)
  } catch (error) {
    next(error)
  }
})

router.get('/api/inventory', (req: Request, res: Response, next: NextFunction): void => {
  try {
    res.send({
      batteries,
      transformer
    })
  } catch (error) {
    next(error)
  }
})

router.get('/api/session', getSession, (req: Request, res: Response, next: NextFunction): void => {
  try {
    if (res.locals.session) {
      res.send(res.locals.session)
    } else {
      res.send({})
    }
  } catch (error) {
    next(error)
  }
})

router.post('/api/saveSelectedBatteries', saveSession, (req: Request, res: Response, next: NextFunction): void => {
  try {
    res.status(200).json({ message: 'Success!' })
  } catch (error) {
    next(error)
  }
})

router.get('/api/name', (req: Request, res: Response, next: NextFunction): void => {
  try {
    res.send({ value: os.userInfo().username })
  } catch (error) {
    next(error)
  }
})

app.use(router)

app.listen(PORT, () => {
  console.info(`App listening on port ${PORT}`)
})

process.on('SIGINT', () => {
  console.info('Gracefully shutting down from SIGINT (Ctrl-C)')
  process.exit(0)
})
