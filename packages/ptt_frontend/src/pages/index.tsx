import {NextPage} from 'next'
import Head from 'next/head'
import Link from 'next/link'
import {graphql} from '../lib/graphql'
import {Header} from '../component/Header'
import React, {useEffect, useState} from 'react'
import {Petition} from '@deptno/ptt_graphql'
import {Footer} from '../component/Footer'
import {NextSeo} from 'next-seo'

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
      <NextSeo
        title="청와대 국민청원 차트"
        description="비공식 국민청원 순위 차트"
        canonical="https://deptno.github.io/petitions/"
        openGraph={{
            url: 'https://deptno.github.io/petitions/',
            title: '청와대 국민청원 차트',
            description: '청와대 국민청원 순위 차트, 그래프',
            images: [
                { url: 'https://deptno.github.io/petitions/logo.png' },
            ],
            site_name: '청와대 국민청원 차트',
        }}
        twitter={{
            handle: '@deptno',
            site: '@deptno',
            cardType: 'summary_large_image',
        }}
      />
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
        <ul className="list pl0">
          {petitions.map((t, i) => {
            return (
              <Link href="/petition/[no]" as={`/petition/${t.no}`} key={t.no}>
                <a className="link black-70">
                  <li className="flex flex-column mv2 pa2 w-100 hover-bg-gold bl bw1 b--black-05">
                    <p className="flex justify-between mv0 black-70 f6">
                      <span className="w3">
                      <span className="tc ph1 bg-gold">{t.category}</span>
                      </span>
                      <span className="w4 light-red">{t.remains} 남음</span>
                      <span className="w4 ml-auto tr underline">{t.people} 명</span>
                    </p>
                    <p className="mv0 pv1 black-70">
                      <span className="flex-auto">{t.title}</span>
                    </p>
                  </li>
                </a>
              </Link>
            )
          })}
        </ul>
      </div>
      <Footer/>
    </div>
  )
}

export default IndexPage

type Data = Petition[]
