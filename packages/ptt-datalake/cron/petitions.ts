import {petitions} from '../src/petitions'
import {ScheduledHandler} from 'aws-lambda'

export const handler: ScheduledHandler = event => {
  return petitions()
}

if (process.env.RUN) {
  (handler as any)()
}
