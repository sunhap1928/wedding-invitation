import { eventDateLabel, hosts } from '../weddingData'

export default function FamilyInvite() {
  return (
    <section className="invite">
      <div className="invite__card">
        <p className="sanskrit">॥ శుభమస్తు ॥</p>
        <p className="invite__text">
          With the blessings of our elders and the grace of the divine, we,
        </p>
        <h2 className="invite__hosts">
          {hosts.father} <span className="amp">&amp;</span> {hosts.mother}
        </h2>
        <p className="invite__text">
          joyfully invite you to share in our happiness as our beloved twin sons,
        </p>
        <p className="invite__couples">Ramesh &amp; Seeshu</p>
        <p className="invite__text">
          are united in marriage with their brides, Lakshmi Lavanya and Sravanthi, on
        </p>
        <p className="invite__date">{eventDateLabel}</p>
        <p className="invite__text invite__text--small">
          Your presence and blessings are the most treasured gifts we could ask for.
        </p>
      </div>
    </section>
  )
}
