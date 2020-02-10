import {ScheduledHandler} from 'aws-lambda'
import {ddb} from '../src/dynamodb'
import {const_ddb_table} from '../src/constant'
import {groupBy, partition, prop, propEq} from 'ramda'
import {AccDocument, AtDocument} from '../src/type'
import {s3} from '../src/s3'

export const handler: ScheduledHandler = event => {
  return ddb.scan({TableName: const_ddb_table})
    .then(x => x.items)
    .then(items => {
      const groupByNo = groupBy(prop('hk'), items)

      Object.entries(groupByNo)
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
        .map(([filename, data]) => {
          return s3
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

              return s3.putObject({
                Bucket: 'dev-petitions-archive',
                ContentType: 'application/json',
                Key: filename.toString(),
                Body: json,

              })
                .promise()
                .then(console.log)
            })
        })
    })
}

if (process.env.RUN) {
  (handler as any)()
}

