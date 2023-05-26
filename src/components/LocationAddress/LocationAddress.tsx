import clsx from 'clsx'
import './LocationAddress.scss'

interface Props {
  className?: string
}

export default function LocationAddress({ className }: Props) {
  return (
    <div className={clsx('location', className)}>
      <div className="location__type">PICKUP</div>
      <div className="location__address">
        <span>New York</span>
        <br />
        25 Mortada street, Gainalkes...
      </div>
    </div>
  )
}
