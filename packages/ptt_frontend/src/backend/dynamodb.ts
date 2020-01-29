import {DynamoDB} from 'aws-sdk'
import {createDynamoDB} from '@deptno/dynamodb'

const region = 'ap-northeast-2'

export const ddb = createDynamoDB(new DynamoDB.DocumentClient({region}))
