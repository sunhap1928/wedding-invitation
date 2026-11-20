import { useState } from 'react'
import { eventDateLabel, schedule, venue } from '../weddingData'

const faqs = [
  {
    q: 'When is the wedding?',
    a: `${eventDateLabel}. Dinner begins at ${schedule[0].time}, followed by the sacred Muhurtam ceremonies later that night.`,
  },
  {
    q: 'Where is the venue?',
    a: `${venue.name}, ${venue.line1}, ${venue.line2}, ${venue.city}.`,
  },
  {
    q: 'What time should I arrive?',
    a: 'We recommend arriving by 7:00 PM for dinner so you can also be present for the Muhurtam later in the night.',
  },
  {
    q: 'Is parking available at the venue?',
    a: 'Yes, parking is available at RK Function Hall for all guests.',
  },
  {
    q: 'What should I wear?',
    a: 'Traditional or festive ethnic attire is recommended — sarees, lehengas, kurtas, or sherwanis are all welcome!',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section className="faq">
      <p className="section-eyebrow">Good to Know</p>
      <h2 className="section-title">Frequently Asked Questions</h2>
      <div className="faq__list">
        {faqs.map((item, i) => (
          <div className={`faq__item ${openIndex === i ? 'is-open' : ''}`} key={item.q}>
            <button
              className="faq__question"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              aria-expanded={openIndex === i}
            >
              {item.q}
              <span className="faq__icon">{openIndex === i ? '−' : '+'}</span>
            </button>
            {openIndex === i && <p className="faq__answer">{item.a}</p>}
          </div>
        ))}
      </div>
    </section>
  )
}
