import rameshLavanya from '../assets/ramesh-lavanya.jpeg'
import seshuSravanthi from '../assets/seshu-sravanthi.jpeg'

const photos = [
  { src: rameshLavanya, caption: 'Ramesh & Lakshmi Lavanya' },
  { src: seshuSravanthi, caption: 'Seshu & Sravanthi' },
]

export default function Gallery() {
  return (
    <section className="gallery" id="gallery">
      <p className="section-eyebrow">Moments to Cherish</p>
      <h2 className="section-title">Our Gallery</h2>
      <div className="gallery__grid">
        {photos.map((p) => (
          <figure className="gallery__item" key={p.caption}>
            <img src={p.src} alt={p.caption} loading="lazy" />
            <figcaption>{p.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
