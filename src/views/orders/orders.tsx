import { useEffect, useState } from 'react'
import Header from '@/components/Header/Header'
import Status from '@/components/Status/Status'
import Destination from '@/components/Destination/Destination'
import Time from '@/components/Time/Time'
import PickUp from './components/PickUp'
import { ReactComponent as SearchIcon } from '@/assets/search.svg'
import { ReactComponent as FreightIcon } from '@/assets/freight.svg'
import { ReactComponent as ContainerTruckIcon } from '@/assets/container-truck.svg'
import { ReactComponent as MarkerIcon } from '@/assets/marker.svg'
import { ReactComponent as TruckIcon } from '@/assets/truck-1.svg'
import { ReactComponent as EyeIcon } from '@/assets/eye.svg'
import { Order, getOrders } from '@/services/orders/orders.service'
import { formatDate, formatTime } from '@/utils/date'
import './orders.scss'

const orderTypeIcons: Record<string, JSX.Element> = {
  FCL: <FreightIcon />,
  FTL: <ContainerTruckIcon />,
}

const destinationTypeIcons: Record<string, JSX.Element> = {
  Recolección: <TruckIcon />,
  Entrega: <MarkerIcon />,
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    getOrders().then(setOrders).catch(console.error)
  }, [])

  return (
    <>
      <Header title="Cargo Orders" />

      <label className="filter centered-flex">
        <div className="filter__icon centered-flex">
          <SearchIcon />
        </div>

        <input className="filter__input" type="text" placeholder="Search..." />
      </label>

      <section className="orders">
        {orders.map(({ _id, order_number, type, status, status_string, status_class, destinations, start_date }) => (
          <article key={_id} className="order">
            <h2 className="order__title">
              Orden <span className="order__number">#{order_number}</span>
            </h2>

            <div className="order__card">
              <header className="order__header">
                <div className="order__type">
                  {orderTypeIcons[type]}
                  {type}
                </div>

                <Status status={status_string} statusClass={status_class} />
              </header>

              <ol className="order__destinations">
                {destinations.map(({ address, nickname, start_date }) => (
                  <li key={address} className="order__destination">
                    <div className="order__destination__icon">{destinationTypeIcons[nickname]}</div>
                    <Destination type={nickname} address={address} />

                    <Time timestamp={start_date} className="order__destination__date">
                      {formatDate(start_date, { dateStyle: 'short' })}
                      <span className="order__destination__time">{formatTime(start_date, { hourCycle: 'h24' })}</span>
                    </Time>
                  </li>
                ))}
              </ol>

              <footer className="order__actions">
                <PickUp status={status} dateTime={start_date} />

                <button className="order__resume centered-flex">
                  Resume
                  <EyeIcon />
                </button>
              </footer>
            </div>
          </article>
        ))}
      </section>
    </>
  )
}
