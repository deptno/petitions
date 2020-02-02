import {NextPage} from 'next'
import Head from 'next/head'
import Link from 'next/link'
import {graphql} from '../lib/graphql'
import {Footer} from '../component/Footer'

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
      <div className="bg-washed-red pv1 lh-copy black-70">
        <span className="ph2 pv1 mh2 black ">/</span>
      </div>
      <h1>
        국민 청원
      </h1>
      <ul className="list pl0">
        {items.map((t, i) => {
          return (
            <Link href="detail/[no]" as={`detail/${t.no}`} key={t.no}>
              <a className="link black-70">
                <li className="flex flex-column mv2 pa2 w-100 hover-bg-gold">
                  <p className="flex justify-between mv0 black-70 f6">
                    <span className="w4 light-red">{t.remains} 남음</span>
                    <span className="w3 tc">{t.category}</span>
                    <span className="w4 tr underline">{t.people} 명</span>
                  </p>
                  <p className="mv0 pv1 black">
                    <span className="flex-auto">{t.title}</span>
                  </p>
                </li>
              </a>
            </Link>
          )
        })}
      </ul>
      <Footer />
    </div>
  )
}
IndexPage.getInitialProps = async (ctx) => {
  const {petitions} = await graphql(/* language=graphql */ `
    query {
      petitions {
        category
        remains
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
    remains: string
    category: string
    people: number
    ttl: number
    rk: string
    title: string
  }[]
}
