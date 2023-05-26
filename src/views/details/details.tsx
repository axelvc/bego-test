import Header from '@/components/Header/Header'
import LocationAddress from '@/components/LocationAddress/LocationAddress'
import DriverImg from '@/assets/Driver.png'
import { ReactComponent as TruckIcon } from '@/assets/truck-2.svg'
import { ReactComponent as AngleUpIcon } from '@/assets/angle-small-up.svg'
import './details.scss'
import Status from '@/components/Status/Status'

export default function Details() {
  return (
    <>
      <Header title="Cargo Details" />

      <section className="order">
        <div className="order__reference">Refrenecia A1180</div>
        <div className="order__number">Order: #7804GNZ</div>

        <ol className="order__locations">
          <li className="order__location">
            <div className="centered-flex order__location__decorator">
              <TruckIcon />
            </div>

            <div className="order__location__details">
              <LocationAddress />
              <Status className="order__location__status" />
            </div>
          </li>
          <li className="order__location">
            <div className="centered-flex order__location__decorator">
              <TruckIcon />
            </div>

            <div className="order__location__details">
              <LocationAddress />
              <Status className="order__location__status" />
            </div>
          </li>
        </ol>
      </section>

      <section className="track">
        <div className="track__driver centered-flex">
          <img src={DriverImg} />
        </div>

        <time className="track__time">10:30 PM</time>

        <ol className="track__steps">
          <li className="track__step">Created Order</li>
          <li className="track__step">Accepted Order</li>
          <li className="track__step">Pick set up by William</li>
          <li className="track__step">Pickup Completed</li>
        </ol>

        <button type="button" disabled>
          Track Order
        </button>
      </section>

      <details className="extra">
        <summary>
          Pickup Data
          <AngleUpIcon className="extra__open-indicator" />
        </summary>

        <div className="extra__details">
          Isidro Fabela 10, Valle Verde y Terminal, 50140 Toluca de Lerdo, México.
          <br />
          <br />
          14 de Octubre 2023 10:30
          <br />
          <br />
          +52 55 67 89 0346
          <br />
          <br />
          johndoe@gmail.com
        </div>
      </details>
    </>
  )
}
