import clsx from 'clsx'
import { Link } from 'wouter'
import Destination from '@/components/Destination/Destination'
import Status from '@/components/Status/Status'
import Time from '@/components/Time/Time'
import PickUp from './PickUp'
import { ReactComponent as FreightIcon } from '@/assets/freight.svg'
import { ReactComponent as ContainerTruckIcon } from '@/assets/container-truck.svg'
import { ReactComponent as MarkerIcon } from '@/assets/marker.svg'
import { ReactComponent as TruckIcon } from '@/assets/truck-1.svg'
import { ReactComponent as EyeIcon } from '@/assets/eye.svg'
import { Order } from '@/services/orders/orders.service'
import { formatDate, formatTime } from '@/utils/date'
import s from '../orders.module.scss'

const orderTypeIcons: Record<string, JSX.Element> = {
  FCL: <FreightIcon />,
  FTL: <ContainerTruckIcon />,
}

const destinationTypeIcons: Record<string, JSX.Element> = {
  Recolección: <TruckIcon />,
  Entrega: <MarkerIcon />,
}

interface Props {
  order: Order
}

export default function OrderItem({ order }: Props) {
  const { _id, order_number, type, status, status_string, status_class, destinations, start_date } = order

  return (
    <article key={_id} className={s.order}>
      <h2 className={s.order__title}>
        Orden <span className={s.order__number}>#{order_number}</span>
      </h2>

      <div className={s.order__card}>
        <header className={s.order__header}>
          <div className={s.order__type}>
            {orderTypeIcons[type]}
            {type}
          </div>

          <Status status={status_string} statusClass={status_class} />
        </header>

        <ol className={s.order__destinations}>
          {destinations.map(({ address, nickname, start_date }) => (
            <li key={address} className={s.order__destination}>
              <div className={s.order__destination__icon}>{destinationTypeIcons[nickname]}</div>
              <Destination type={nickname} address={address} />

              <Time timestamp={start_date} className={s.order__destination__date}>
                {formatDate(start_date, { dateStyle: 'short' })}
                <span className={s.order__destination__time}>{formatTime(start_date, { hourCycle: 'h24' })}</span>
              </Time>
            </li>
          ))}
        </ol>

        <footer className={s.order__actions}>
          <PickUp status={status} dateTime={start_date} />

          <Link href={`/order/${_id}`}>
            <a className={clsx('centered-flex', s.order__resume)}>
              Resume
              <EyeIcon />
            </a>
          </Link>
        </footer>
      </div>
    </article>
  )
}
