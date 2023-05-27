import { useEffect } from 'react'
import { Link } from 'wouter'
import clsx from 'clsx'
import Header from '@/components/Header/Header'
import Status from '@/components/Status/Status'
import Destination from '@/components/Destination/Destination'
import Time from '@/components/Time/Time'
import PickUp from './components/PickUp'
import Filters from './components/Filters'
import { ReactComponent as FreightIcon } from '@/assets/freight.svg'
import { ReactComponent as ContainerTruckIcon } from '@/assets/container-truck.svg'
import { ReactComponent as MarkerIcon } from '@/assets/marker.svg'
import { ReactComponent as TruckIcon } from '@/assets/truck-1.svg'
import { ReactComponent as EyeIcon } from '@/assets/eye.svg'
import { getOrders } from '@/services/orders/orders.service'
import { formatDate, formatTime } from '@/utils/date'
import { useOrderState } from './orders.state'
import s from './orders.module.scss'

const orderTypeIcons: Record<string, JSX.Element> = {
  FCL: <FreightIcon />,
  FTL: <ContainerTruckIcon />,
}

const destinationTypeIcons: Record<string, JSX.Element> = {
  Recolección: <TruckIcon />,
  Entrega: <MarkerIcon />,
}

export default function Orders() {
  const [filteredOrders, setOrders] = useOrderState((s) => [s.filteredOrders, s.setOrders])

  useEffect(() => {
    getOrders().then(setOrders).catch(console.error)
  }, [setOrders])

  return (
    <>
      <Header title="Cargo Orders" />
      <Filters />
      <section className={s.orders}>
        {filteredOrders.map(
          ({ _id, order_number, type, status, status_string, status_class, destinations, start_date }) => (
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
                        <span className={s.order__destination__time}>
                          {formatTime(start_date, { hourCycle: 'h24' })}
                        </span>
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
          ),
        )}
      </section>
    </>
  )
}
