import {ScheduledHandler} from 'aws-lambda'
import {ddb} from '../src/dynamodb'
import {const_ddb_table, const_s3} from '../src/constant'
import {groupBy, partition, prop, propEq} from 'ramda'
import {AccDocument, AtDocument} from '../src/type'
import {s3} from '../src/s3'

export const handler: ScheduledHandler = async event => {
  try {
    await ddb.scan({TableName: const_ddb_table})
      .then(({items}) =>
        Promise.all(
          Object.entries(groupBy(prop('hk'), items))
            .map(([no, data]) => {
              const [metadata, at] = partition(propEq('rk', 'acc'), data) as [AccDocument[], AtDocument[]]
              const filename = `${no}.json`
              const ticks = at.map(a => [
                new Date(a.rk.slice(3)).toISOString(),
                a.people,
              ])

              return [
                filename,
                {
                  metadata: {
                    ...metadata[0],
                    endDate: new Date(metadata[0].endDate),
                  },
                  ticks,
                },
              ]
            })
            .map(([filename, data]) => s3
              .headObject({
                // todo: move to env
                Bucket: 'dev-petitions-archive',
                Key: filename.toString(),
              })
              .promise()
              .catch(x => console.error(x.statusCode))
              .then(file => {
                const json = JSON.stringify(data)

                if (file) {
                  if (json.length < (file.ContentLength || 0)) {
                    console.log(`skip json(${json.length}) < ${file.ContentLength || 0}`)
                    return
                  }
                }

                return s3
                  .putObject({
                    Bucket: const_s3,
                    ContentType: 'application/json',
                    Key: filename.toString(),
                    Body: json,
                  })
                  .promise()
              }),
            ),
        ),
      )
  } catch (e) {
    console.error('error', e)
  }
}

if (process.env.RUN) {
  (handler as any)()
}

