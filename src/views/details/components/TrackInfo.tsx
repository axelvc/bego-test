import { OrderDetails, StatusList } from '@/services/orders.types'

interface Props {
  details: OrderDetails
  type: string
}

export default function TrackInfo({ type, details }: Props) {
  const steps = details.status_list[type as keyof StatusList]

  return (
    <ol className="track__steps">
      {steps.map(({ status }, i) => (
        <li className="track__step" key={i}>
          {status}
        </li>
      ))}
    </ol>
  )
}
