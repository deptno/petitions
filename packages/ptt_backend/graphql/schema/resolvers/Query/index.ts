import {petitions} from './petitions'
import {petition} from './petition'
import {chart} from './chart'
import {QueryResolvers} from '@deptno/ptt_graphql'

export const Query: QueryResolvers = {
  petitions,
  petition,
  chart,
}
