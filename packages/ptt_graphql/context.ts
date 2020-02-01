import {Petition, PetitionTick} from './graphql'

export type Context = {
  claim: unknown
  dataSources: {
    ptt: PetitionsDataSourceInterface
  }
}

export type PetitionsDataSourceInterface = {
  petitions(): Promise<Petition[]>
  petition(id: number): Promise<Petition>
  chart(petitionId: number): Promise<PetitionTick[]>
}
