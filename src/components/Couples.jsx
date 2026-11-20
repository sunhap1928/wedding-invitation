import rameshLavanya from '../assets/ramesh-lavanya.jpeg'
import seeshuSravanthi from '../assets/seeshu-sravanthi.jpeg'
import { couples, hosts } from '../weddingData'

const photos = {
  'ramesh-lavanya': rameshLavanya,
  'seeshu-sravanthi': seeshuSravanthi,
}

export default function Couples() {
  return (
    <section className="couples" id="couples">
      <p className="section-eyebrow">The Twins &amp; Their Brides</p>
      <h2 className="section-title">Two Brothers, Two Brides, One Blessed Day</h2>
      <p className="section-sub">
        Sons of {hosts.father} &amp; {hosts.mother}
      </p>
      <div className="couples__grid">
        {couples.map((c) => (
          <article className="couple-card" key={c.id}>
            <div className="couple-card__photo-wrap">
              <img src={photos[c.photo]} alt={`${c.groom} and ${c.bride}`} className="couple-card__photo" />
            </div>
            <h3 className="couple-card__names">
              {c.groom} <span className="amp">&amp;</span> {c.bride}
            </h3>
            <p className="couple-card__tagline">{c.tagline}</p>
            <p className="couple-card__muhurtam">Muhurtam at {c.muhurtamTime}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
