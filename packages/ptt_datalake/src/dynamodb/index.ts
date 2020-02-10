import {createDynamoDB} from '@deptno/dynamodb'
import {DynamoDB} from 'aws-sdk'

const ddbClient = new DynamoDB.DocumentClient({region: 'ap-northeast-2'})

export const ddb = createDynamoDB(ddbClient)
