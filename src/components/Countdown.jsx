import { useEffect, useState } from 'react'
import { WEDDING_DATE_ISO } from '../weddingData'

function getTimeLeft() {
  const diff = new Date(WEDDING_DATE_ISO).getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true }
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    done: false,
  }
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft)

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  if (timeLeft.done) {
    return (
      <section className="countdown">
        <p className="countdown__done">The celebration has begun — bless the newlyweds! ✦</p>
      </section>
    )
  }

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ]

  return (
    <section className="countdown">
      <p className="section-eyebrow">Until the celebration begins</p>
      <div className="countdown__grid">
        {units.map((u) => (
          <div className="countdown__unit" key={u.label}>
            <span className="countdown__value">{String(u.value).padStart(2, '0')}</span>
            <span className="countdown__label">{u.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
