import {PetitionsDataSourceInterface} from '@deptno/ptt_graphql'
import {DataSource} from 'apollo-datasource'
import {createDynamoDB} from '@deptno/dynamodb'
import {DocumentClient} from 'aws-sdk/lib/dynamodb/document_client'
import {format, parse} from 'date-fns'

export class PetitionsDataSource extends DataSource implements PetitionsDataSourceInterface {
  #ddb: ReturnType<typeof createDynamoDB>
  #tableName: string

  constructor(documentClient: DocumentClient, tableName: string) {
    super()

    this.#ddb = createDynamoDB(documentClient)
    this.#tableName = tableName
  }

  async petitions() {
    return this.#ddb
      .query({
        TableName: 'dev-petitions',
        IndexName: 'rkNo',
        KeyConditionExpression: '#h = :h',
        ExpressionAttributeNames: {
          '#h': 'rk',
        },
        ExpressionAttributeValues: {
          ':h': 'acc',
        },
      })
      .then(response => {
        response.items
          .map((t: any) => {
            return {
              ...t,
              endDate: format(
                parse(t.endDate, 'yyyy-MM-dd\'T\'HH:mmxx', new Date()),
                'yyyy-MM-dd',
              ),
            }
          })
          .sort((a: any, b: any) => {
            return a.people < b.people ? 1 : -1
          })
      })
  }

  async petition(id: number) {
    return this.#ddb
      .get({
        TableName: 'dev-petitions',
        Key: {
          'hk': id,
          'rk': 'acc',
        },
      })
      .then((response: any) => {
        return {
          ...response,
          endDate: format(
            parse(response.endDate, 'yyyy-MM-dd\'T\'HH:mmxx', new Date()),
            'yyyy년 MM월 dd일',
          ),
        }
      })
  }

  async chart(petitionId: number) {
    return this.#ddb
      .query({
        TableName: 'dev-petitions',
        KeyConditionExpression: '#h = :h AND begins_with(#r, :r)',
        ExpressionAttributeNames: {
          '#h': 'hk',
          '#r': 'rk',
        },
        ExpressionAttributeValues: {
          ':h': petitionId,
          ':r': 'at#',
        },
      })
      .then(response => {
        return response.items
      })
  }
}