import {NextPage} from 'next'
import Head from 'next/head'
import Link from 'next/link'
import fetch from 'cross-fetch'

export const IndexPage: NextPage<Props> = props => {
  const {items} = props

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
        국민 청원
      </h1>
      <ul className="list">
        {items.map(t => {
          return (
            <Link href="detail/[no]" as={`detail/${t.hk}`} key={t.hk}>
              <a>
                <li className="flex">
                  <span className="w4 dib">{t.category}</span>
                  <span className="w4 dib">{t.people}명</span>
                  <span className="dib">{t.title}</span>
                  <span className="ml-auto dib">{t.endDate}</span>
                </li>
              </a>
            </Link>
          )
        })}
      </ul>
    </div>
  )
}
IndexPage.getInitialProps = async (ctx) => {
  const items = await fetch('http://localhost:3000/api').then(response => response.json())
  console.table(items)

  return {
    items
  }
}
export default IndexPage

type Props = {
  items: {
    no: number
    hk: number
    endDate: string
    category: string
    people: number
    ttl: number
    rk: string
    title: string
  }[]
}
