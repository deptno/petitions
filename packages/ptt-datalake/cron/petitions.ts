import {petitions} from '../src/petitions'

export const handler = () => {
  return petitions()
}

if (process.env.RUN) {
  handler()
}
