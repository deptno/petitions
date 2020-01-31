import {Petition, PetitionTick} from './graphql'

export type Context = {
  claim: unknown
  dataSources: {
    petitions: PetitionsDataSourceInterface
  }
}

export type PetitionsDataSourceInterface = {
  petitions(): Promise<Petition[]>
  petition(id: number): Promise<Petition>
  chart(id: number): Promise<PetitionTick[]>
}