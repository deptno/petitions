import {AccDocument} from '../type'

export const createAtDocument = (dateX: string) =>
  (a: AccDocument) => {
    return {
      hk    : a.hk,
      rk    : `at#${dateX}`,
      people: a.people,
      ttl   : a.ttl,
    }
  }
