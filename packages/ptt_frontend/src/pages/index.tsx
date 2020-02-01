import {NextPage} from 'next'
import Head from 'next/head'
import Link from 'next/link'
import {graphql} from '../lib/graphql'

export const IndexPage: NextPage<Props> = props => {
  const {items} = props

  return (
    <div className="pa3">
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
      <ul className="list pl0">
        {items.map((t, i) => {
          return (
            <Link href="detail/[no]" as={`detail/${t.no}`} key={t.no}>
              <a className="link black-70">
                <li className="flex">
                  <span className="w3">#{(i+1).toString().padStart(2, '0')}</span>
                  <span className="w4">{t.endDate}</span>
                  <span className="w4">{t.category}</span>
                  <span className="w4">{t.people}명</span>
                  <span className="flex-auto">{t.title}</span>
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
  const {petitions} = await graphql(/* language=graphql */ `
    query {
      petitions {
        category
        endDate
        no
        title
        people
      }
    }
  `)
  console.log(petitions)
  console.table(petitions)

  return {
    items: petitions
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
