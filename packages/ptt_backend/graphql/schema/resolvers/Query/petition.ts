import {QueryResolvers} from '@deptno/ptt_graphql'

export const petition: QueryResolvers['petition'] = (_, args, context) => {
  return context.dataSources.ptt.petition(args.id)
}
