import {QueryResolvers} from '@deptno/ptt_graphql'

export const chart: QueryResolvers['chart'] = async (_, args, context) => {
  return context.dataSources.ptt.chart(args.petitionId)
}
