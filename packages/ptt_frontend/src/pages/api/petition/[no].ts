import {NextApiRequest, NextApiResponse} from 'next'
import {ddb} from '../../../backend/dynamodb'
import {format, parse} from 'date-fns'

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
    .then((response: any) => {
      res
        .status(200)
        .send({
          ...response,
          endDate: format(
            parse(response.endDate, 'yyyy-MM-dd\'T\'HH:mmxx', new Date()),
            'yyyy년 MM월 dd일'
          )
        })
    })
}
