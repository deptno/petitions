import {NextApiRequest, NextApiResponse} from 'next'
import {DynamoDB} from 'aws-sdk'
import {createDynamoDB} from '@deptno/dynamodb'

const region = 'ap-northeast-2'
const ddb = createDynamoDB(new DynamoDB.DocumentClient({region}))

export default (req: NextApiRequest, res: NextApiResponse) => {
  const {no} = req.query

  ddb
    .query({
      TableName                : 'dev-petitions',
      KeyConditionExpression   : '#h = :h AND begins_with(#r, :r)',
      ExpressionAttributeNames : {
        '#h': 'hk',
        '#r': 'rk'
      },
      ExpressionAttributeValues: {
        ':h': Number(no),
        ':r': 'at#'
      }
    })
    .then(response => {
      res
        .status(200)
        .send(response.items)
    })
}
