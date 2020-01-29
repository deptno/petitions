import {NextApiRequest, NextApiResponse} from 'next'
import {DynamoDB} from 'aws-sdk'
import {createDynamoDB} from '@deptno/dynamodb'
import {format, parse} from 'date-fns'

const region = 'ap-northeast-2'
const ddb = createDynamoDB(new DynamoDB.DocumentClient({region}))

export default (req: NextApiRequest, res: NextApiResponse) => {
  ddb
    .query({
      TableName                : 'dev-petitions',
      IndexName                : 'rkNo',
      KeyConditionExpression   : '#h = :h',
      ExpressionAttributeNames : {
        '#h': 'rk'
      },
      ExpressionAttributeValues: {
        ':h': 'acc'
      }
    })
    .then(response => {
      res
        .status(200)
        .send(
          response.items
            .map((t: any) => {
              return {
                ...t,
                endDate: format(
                  parse(t.endDate, 'yyyy-MM-dd\'T\'HH:mmxx', new Date()),
                  'yyyy-MM-dd'
                )
              }
            })
            .sort((a: any, b: any) => {
              return a.people < b.people ? 1 : -1
            })
        )
    })
}
