import {format} from 'date-fns'
import {util} from '@deptno/dynamodb'
import {const_ddb_table, const_yyyyMMDdTHHMmxx} from './constant'
import {AccDocument, AtDocument} from './type'
import {createRowParser} from './parser/createRowParser'
import {createAccDocument} from './entity/createAccDocument'
import {createAtDocument} from './entity/createAtDocument'
import {getRows} from './parser/getRows'
import {getBestPetitionsHtml} from './getBestPetitionsHtml'
import {ddb} from './dynamodb'

export const petitions = async () => {
  try {
    const html = await getBestPetitionsHtml()
    if (!html) {
      return console.error('fail')
    }
    const now = new Date()
    const nowX = format(now, const_yyyyMMDdTHHMmxx)
    const acc: AccDocument[] = getRows(html)
      .map(createRowParser(now))
      .map(createAccDocument)
      .filter(a => a.ttl - util.ttl(now) > 0)
    const at: AtDocument[] = acc.map(createAtDocument(nowX))

    return ddb.batchWrite({
      tableName: const_ddb_table,
      items: [
        ...acc,
        ...at,
      ]
    })
  } catch (e) {
    console.error('error', e)
  }
}
