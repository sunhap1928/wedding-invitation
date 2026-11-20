import { eventDateLabel, venue } from '../weddingData'

export default function Hero({ onNavigate }) {
  return (
    <header className="hero">
      <div className="hero__overlay" />
      <div className="hero__content">
        <p className="eyebrow sanskrit">॥ శ్రీ గణేశాయ నమః ॥</p>
        <p className="eyebrow">The Peela Family joyfully welcomes you to</p>
        <h1 className="hero__title">
          Twin Weddings <span className="amp">&amp;</span> Twin Blessings
        </h1>
        <p className="hero__names">
          Ramesh <span className="weds">weds</span> Lakshmi Lavanya
          <span className="divider-dot">✦</span>
          Seeshu <span className="weds">weds</span> Sravanthi
        </p>
        <p className="hero__date">{eventDateLabel}</p>
        <p className="hero__venue">
          {venue.name}, {venue.line1}, {venue.city}
        </p>
        <div className="hero__cta">
          <button className="btn btn--primary" onClick={() => onNavigate('schedule')}>
            View Invitation
          </button>
        </div>
      </div>
      <button className="hero__scroll" onClick={() => onNavigate('couples')} aria-label="Scroll down">
        ✦
      </button>
    </header>
  )
}
