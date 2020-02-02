import {Petition, PetitionsDataSourceInterface, PetitionTick} from '@deptno/ptt_graphql'
import {DataSource} from 'apollo-datasource'
import {createDynamoDB} from '@deptno/dynamodb'
import {DocumentClient} from 'aws-sdk/lib/dynamodb/document_client'
import {format, formatDistanceToNow, parse} from 'date-fns'
import locale from 'date-fns/locale/ko'

export class PetitionsDataSource extends DataSource implements PetitionsDataSourceInterface {
  private ddb: ReturnType<typeof createDynamoDB>

  constructor(documentClient: DocumentClient, private tableName: string) {
    super()

    this.ddb = createDynamoDB(documentClient)
  }

  async petitions() {
    return this.ddb
      .query<Petition>({
        TableName                : 'dev-petitions',
        IndexName                : 'rkNo',
        KeyConditionExpression   : '#h = :h',
        ExpressionAttributeNames : {
          '#h': 'rk',
        },
        ExpressionAttributeValues: {
          ':h': 'acc',
        },
      })
      .then(response => {
        return response.items
          .sort((a, b) => a.people < b.people ? 1 : -1)
          .map((t: any) => {
            return {
              ...t,
              people: comma(t.people),
              endDate: format(
                parse(t.endDate, 'yyyy-MM-dd\'T\'HH:mmxx', new Date()),
                'yyyy년 MM월 dd일',
              ),
              remains: formatDistanceToNow(
                parse(t.endDate, 'yyyy-MM-dd\'T\'HH:mmxx', new Date()),
                {locale}
              ),
            }
          })
      })
  }

  async petition(id: number) {
    return this.ddb
      .get<Petition>({
        TableName: 'dev-petitions',
        Key      : {
          'hk': id,
          'rk': 'acc',
        },
      })
      .then((response: any) => {
        return {
          ...response,
          people: comma(response.people),
          endDate: format(
            parse(response.endDate, 'yyyy-MM-dd\'T\'HH:mmxx', new Date()),
            'yyyy년 MM월 dd일',
          ),
          remains: formatDistanceToNow(
            parse(response.endDate, 'yyyy-MM-dd\'T\'HH:mmxx', new Date()),
            {locale}
          ),
        }
      })
  }

  async chart(petitionId: number) {
    return this.ddb
      .query<DPetitionTick>({
        TableName                : 'dev-petitions',
        KeyConditionExpression   : '#h = :h AND begins_with(#r, :r)',
        ExpressionAttributeNames : {
          '#h': 'hk',
          '#r': 'rk',
        },
        ExpressionAttributeValues: {
          ':h': petitionId,
          ':r': 'at#',
        },
      })
      .then(response => {
        return response.items.map<PetitionTick>(t => {
          console.log({
            no: t.hk,
            people: t.people,
            at: new Date(t.rk.slice(3)),
          })
          return {
            no: t.hk,
            people: t.people,
            at: new Date(t.rk.slice(3)),
          }
        })
      })
  }
}

const comma = Intl.NumberFormat('ko-KR').format

type DPetitionTick = {
  hk: number
  rk: string
  people: number
  ttl: number
}
