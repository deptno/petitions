import {NextApiRequest, NextApiResponse} from 'next'
import {ddb} from '../../../backend/dynamodb'

export default (req: NextApiRequest, res: NextApiResponse) => {
  const {no} = req.query

  ddb
    .get({
      TableName                : 'dev-petitions',
      Key: {
        'hk': Number(no),
        'rk': 'acc'
      }
    })
    .then(response => {
      res
        .status(200)
        .send(response)
    })
}
