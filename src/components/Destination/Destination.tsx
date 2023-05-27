import clsx from 'clsx'
import './Destination.scss'

interface Props {
  type: string
  address: string
  className?: string
}

export default function Destination({ type, address, className }: Props) {
  return (
    <div className={clsx('destination', className)}>
      <div className="destination__type">{type}</div>
      <div className="destination__address">{address}</div>
    </div>
  )
}
