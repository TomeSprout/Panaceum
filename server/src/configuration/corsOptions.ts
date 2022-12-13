import { CorsOptions } from 'cors'
import { allowedOrigins } from './allowedOrigins'

const errCorsDecline: string = 'Not allowed by CORS'

const corsOptions: CorsOptions = {
  origin: (origin, callback): void => {
    if (allowedOrigins.indexOf(origin!) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error(errCorsDecline))
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
}

export { corsOptions }
