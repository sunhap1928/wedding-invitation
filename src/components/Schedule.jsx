import { eventDateLabel, schedule, venue } from '../weddingData'

export default function Schedule() {
  return (
    <section className="schedule" id="schedule">
      <p className="section-eyebrow">Wedding Day Timeline</p>
      <h2 className="section-title">{eventDateLabel}</h2>
      <p className="section-sub">
        {venue.name}, {venue.line1}, {venue.city}
      </p>
      <ol className="timeline">
        {schedule.map((item) => (
          <li className="timeline__item" key={item.title}>
            <span className="timeline__time">{item.time}</span>
            <span className="timeline__line" aria-hidden="true" />
            <div className="timeline__body">
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
