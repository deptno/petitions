import {QueryResolvers} from '@deptno/ptt_graphql'

export const petitions: QueryResolvers['petitions'] = (_, args, context) => {
  console.log(1)
  console.log(2, context)
  return context.dataSources.ptt.petitions()
}
