import {pipe, zipObj} from 'ramda'
import {util} from '@deptno/dynamodb'
import {format} from "date-fns"
import {const_yyyyMMDdTHHMmxx} from '../constant'

export const createAccDocument = pipe(
  zipObj(['hk', 'category', 'title', 'endDate', 'people']),
  (item: any) => {
    const ttl = util.ttl(item.endDate)

    return {
      ...item,
      ttl,
      endDate: format(item.endDate, const_yyyyMMDdTHHMmxx),
      rk     : 'acc',
      no     : item.hk,
    }
  }
)
