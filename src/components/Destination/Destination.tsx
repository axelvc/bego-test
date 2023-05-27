import * as s from './Destination.module.scss'

interface Props {
  type: string
  address: string
  className?: string
}

export default function Destination({ type, address, className }: Props) {
  return (
    <div className={className}>
      <div className={s.destination__type}>{type}</div>
      <div className={s.destination__address}>{address}</div>
    </div>
  )
}
