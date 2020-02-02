import {QueryResolvers} from '@deptno/ptt_graphql'

export const petitions: QueryResolvers['petitions'] = (_, args, context) => {
  return context.dataSources.ptt.petitions()
}
