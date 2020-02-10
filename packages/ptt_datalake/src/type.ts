export enum Node {
  ELEMENT_NODE = 1
}
export type PetitionsDocument = {
  hk: number
  rk: string
  ttl: number
}
export interface AccDocument extends PetitionsDocument {
  rk: 'acc'
  category: string
  title: string
  endDate: string
  people: number
}
export interface AtDocument extends PetitionsDocument {
  rk: string | 'at#[END_DATE]'
  people: number
}
