import {NextPage} from 'next'
import Head from 'next/head'
import Link from 'next/link'
import {graphql} from '../lib/graphql'
import {Header} from '../component/Header'
import {useEffect, useState} from 'react'

export const IndexPage: NextPage<{}> = props => {
  const [petitions, setPetitions] = useState<Data>([])

  useEffect(() => {
    graphql(/* language=graphql */ `
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
      .then(response => response.petitions)
      .then(setPetitions)
  }, [])

  return (
    <div className="page ml-auto mr-auto">
      <style jsx>
        {/* language=css */ `
            .page {
                max-width: 976px;
            }
        `}
      </style>
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
      <Header/>
      <div className="ph3">
        <h1>
          국민 청원
        </h1>
        <ul className="list pl0">
          {petitions.map((t, i) => {
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
      </div>
    </div>
  )
}

export default IndexPage

type Data = {
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
