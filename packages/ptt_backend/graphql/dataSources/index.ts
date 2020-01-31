import {DynamoDB} from 'aws-sdk'
import {PetitionsDataSource} from './PetitionsDataSource'
import {const_ddb_table} from '../../constant'

export const dataSources = () => {
  return {
    ptt: new PetitionsDataSource(documentClient, const_ddb_table)
  }
}

const region = 'ap-northeast-2'
const documentClient = new DynamoDB.DocumentClient({region})
