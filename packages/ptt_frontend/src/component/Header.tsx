import {FunctionComponent} from 'react'
import Link from 'next/link'

export const Header: FunctionComponent<Props> = props => {
  return (
    <header className="flex f3 pa3">
      <Link href="/" passHref>
        <a className="link black-70">
          <figure className="ma0 flex items-center">
            {/* todo: assetPrefix 버그 있음 */}
            <img src="https://deptno.github.io/petitions/logo.png" width="40" height="40"/>
            <p className="ma0 f5 mh3">청와대 국민청원</p>
          </figure>
        </a>
      </Link>
      <div className="ml-auto flex items-center justify-between">
        <a className="link black mh3" href="https://github.com/deptno/petitions" target="_blank">
          <i className="fab fa-github black-70 "/>
        </a>
        <a className="link black-70" href="http://bglee.me#petitions" target="_blank">
        <span className="f6 db underline b">
          about
        </span>
        </a>
      </div>
    </header>
  )
}

type Props = {}
