import Header from '@/components/Header/Header'
import Status from '@/components/Status/Status'
import LocationAddress from '@/components/LocationAddress/LocationAddress'
import { ReactComponent as SearchIcon } from '@/assets/search.svg'
import { ReactComponent as FreightIcon } from '@/assets/freight.svg'
import { ReactComponent as ContainerTruckIcon } from '@/assets/container-truck.svg'
import { ReactComponent as TruckIcon } from '@/assets/truck-1.svg'
import { ReactComponent as MarkerIcon } from '@/assets/marker.svg'
import { ReactComponent as EyeIcon } from '@/assets/eye.svg'
import './orders.scss'

export default function Orders() {
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
        <article className="order">
          <h2 className="order__title">
            Order <span className="order__number">#7804GNZ</span>
          </h2>

          <div className="order__card">
            <header className="order__header">
              <div className="order__type">
                <FreightIcon />
                FCL
              </div>

              <Status />
            </header>

            <ol className="order__locations">
              <li className="order__location">
                <TruckIcon className="order__location__icon" />
                <LocationAddress />

                <time className="order__location__time">
                  <span className="order__location__date">02/04/23</span> 09:50
                </time>
              </li>

              <li className="order__location">
                <MarkerIcon className="order__location__icon" />
                <LocationAddress />

                <time className="order__location__time">
                  <span className="order__location__date">02/04/23</span> 09:50
                </time>
              </li>
            </ol>

            <footer className="order__actions">
              <div className="order__pickup centered-flex">
                Start pickup in&nbsp;<span className="order__pickup-time">1:30:00</span>
              </div>
              <button className="order__resume centered-flex">
                Resume
                <EyeIcon />
              </button>
            </footer>
          </div>
        </article>

        <article className="order">
          <h2 className="order__title">
            Order <span className="order__number">#ASI890EY4</span>
          </h2>

          <div className="order__card">
            <header className="order__header">
              <div className="order__type">
                <ContainerTruckIcon />
                FTL
              </div>

              <Status />
            </header>

            <ol className="order__locations">
              <li className="order__location">
                <TruckIcon className="order__location__icon" />
                <div className="order__location__address">
                  <div className="order__location__type">PICKUP</div>
                  <div className="order__location__city">New York</div>
                  <div>25 Mortada street, Gainalkes...</div>
                </div>

                <time className="order__location__time">
                  <span className="order__location__date">02/04/23</span> 09:50
                </time>
              </li>

              <li className="order__location">
                <MarkerIcon className="order__location__icon" />
                <div className="order__location__address">
                  <div className="order__location__type">DROPOFF</div>
                  <div className="order__location__city">New York</div>
                  <div>25 Mortada street, Gainalkes...</div>
                </div>

                <time className="order__location__time">
                  <span className="order__location__date">02/04/23</span> 09:50
                </time>
              </li>
            </ol>

            <footer className="order__actions">
              <div className="order__pickup centered-flex">
                Start pickup in&nbsp;<span className="order__pickup-time">1:30:00</span>
              </div>
              <button className="order__resume centered-flex">
                Resume
                <EyeIcon />
              </button>
            </footer>
          </div>
        </article>
      </section>
    </>
  )
}
