import express, { Request, Response, NextFunction } from 'express'
import path from 'path'
import session from 'express-session'
import os from 'os'
import requestIp from 'request-ip'
import createMemoryStore from 'memorystore'
import useragent from 'express-useragent'

const MemoryStore = createMemoryStore(session)
const memoryStoreInstance = new MemoryStore({
  checkPeriod: 86400000 // prune expired entries every 24h
})
declare module 'express-session' {
  export interface SessionData {
    clientIPAddress: string | null,
    name: string,
    value: string
  }
}

const PORT = process.env.PORT || 3000
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(useragent.express())

const handleSession = (req: Request, res: Response, next:NextFunction) => {
  const ipAddress = requestIp.getClientIp(req)
  if (ipAddress) {
    memoryStoreInstance.get(ipAddress, (error, session) => {
      if (error) {
        console.error(error)
      }
      if (!session) {
        memoryStoreInstance.set(
          ipAddress,
          {
            cookie: {
              originalMaxAge: null
            },
            name: 'Aditya',
            value: 'some value',
            clientIPAddress: ipAddress
          }
        )
      }
    })
  }
  next()
}

app.use(express.static(path.join(__dirname, '../public')))

app.get('/api/name', handleSession, (req: Request, res: Response, next: NextFunction): void => {
  try {
    res.send({ value: os.userInfo().username })
  } catch (error) {
    next(error)
  }
})

app.listen(PORT, () => {
  console.info(`App listening on port ${PORT}`)
})

process.on('SIGINT', () => {
  console.info('Gracefully shutting down from SIGINT (Ctrl-C)')
  process.exit(0)
})
