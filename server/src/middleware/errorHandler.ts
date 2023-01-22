import { Request, Response, NextFunction } from 'express'
import { logEvents } from './logger'

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  logEvents(
    `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    'errorLog.log'
  )

  const status: number = res.statusCode ? res.statusCode : 500 // server error

  res.status(status)
  res.json({ message: err.message })
}

export { errorHandler }
