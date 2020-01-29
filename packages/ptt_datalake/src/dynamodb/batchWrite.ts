import {createDynamoDB} from '@deptno/dynamodb'
import {DynamoDB} from 'aws-sdk'
import {const_ddb_table} from '../constant'
import {AccDocument, AtDocument} from '../type'

const ddbClient = new DynamoDB.DocumentClient({
  region: 'ap-northeast-2'
})
const ddb = createDynamoDB(ddbClient)

export const batchWrite = (items: (AccDocument | AtDocument)[]) =>
  ddb.batchWrite({
    tableName: const_ddb_table,
    items
  })
