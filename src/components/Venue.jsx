import { venue } from '../weddingData'

const mapsUrl = 'https://maps.app.goo.gl/SabTQ3rSWBi3iafb6'

export default function Venue() {
  return (
    <section className="venue" id="venue">
      <p className="section-eyebrow">Where to Find Us</p>
      <h2 className="section-title">{venue.name}</h2>
      <p className="venue__address">
        {venue.line1}
        <br />
        {venue.line2}
        <br />
        {venue.city}
      </p>
      <a className="btn btn--primary" href={mapsUrl} target="_blank" rel="noreferrer">
        Open in Google Maps
      </a>
    </section>
  )
}
