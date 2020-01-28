import {NextPage} from 'next'
import Head from 'next/head'
import fetch from 'cross-fetch'

export const DetailPage: NextPage<Props> = props => {
  const {no, items} = props

  console.table(items)
  return (
    <div>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/tachyons/4.11.1/tachyons.min.css"
        />
      </Head>
      <h1>
        청원 번호: #{no}
      </h1>
      <ul className="list">
        {items.length}
      </ul>
    </div>
  )
}
DetailPage.getInitialProps = async (ctx) => {
  const {no} = ctx.query as {[key: string]: string}
  const items = await fetch(`http://localhost:3000/api/chart/${no}`).then(response => response.json())

  return {
    items,
    no
  }
}
export default DetailPage

type Props = {
  items: {
    hk: number
    rk: string
    people: number
    ttl: number
  }[]
  no: string
}
