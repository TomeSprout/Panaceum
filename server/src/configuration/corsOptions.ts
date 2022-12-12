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

/*
  ! See line 8 --> if statement checking origin inside of allowedOrigins
  * origin can be a string or undefined according to the interface: CorsOptions, but throws a type mismatch error
  ? Fix: set the parameter as origin! 


  https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator

  https://stackoverflow.com/questions/54496398/typescript-type-string-undefined-is-not-assignable-to-type-string
*/
