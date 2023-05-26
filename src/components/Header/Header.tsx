import { ReactComponent as BackIcon } from '@/assets/angle-small-left.svg'
import { ReactComponent as BellIcon } from '@/assets/bell.svg'
import './Header.scss'

interface Props {
  title: string
}

export default function Header({ title }: Props) {
  return (
    <header className="header">
      <button type="button" title="Go back" className="header--back">
        <BackIcon />
      </button>

      <h1 className="header--title">{title}</h1>

      <button type="button" title="Notifications" className="header--notifications">
        <BellIcon />
      </button>
    </header>
  )
}
