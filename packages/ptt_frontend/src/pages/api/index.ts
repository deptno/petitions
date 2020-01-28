import {NextApiRequest, NextApiResponse} from 'next'
import {DynamoDB} from 'aws-sdk'
import {createDynamoDB} from '@deptno/dynamodb'

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
        .send(response.items)
    })
}
