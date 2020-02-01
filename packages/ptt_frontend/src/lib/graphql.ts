import fetch from 'cross-fetch'
import {const_graphql_url} from '../constant'

export const graphql = (query: string, variables?: any) => {
  console.log({query})
  return fetch(
    const_graphql_url,
    {
      method: 'post',
      headers: {
        authorization: 'test token',
        'content-type': 'application/json',
      },
      body: JSON.stringify({query, variables}),
    })
    .then(response => response.json())
    .then(response => response.data)
    .catch((e) => console.error(e.message))
}
