import {FunctionComponent} from 'react'

export const Header: FunctionComponent<Props> = props => {
  return (
    <header className="tr f3 pa3">
      <a className="link black" href="http://bglee.me#petitions" target="_blank">
        <span className="f6 mh2 lh-copy">
          about
        </span>
      </a>
    </header>
  )
}

type Props = {}
