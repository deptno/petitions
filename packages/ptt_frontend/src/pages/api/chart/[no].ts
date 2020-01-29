import {NextApiRequest, NextApiResponse} from 'next'
import {ddb} from '../../../backend/dynamodb'

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