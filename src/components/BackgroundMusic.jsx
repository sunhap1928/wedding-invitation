import { useEffect, useRef, useState } from 'react'

const START_AT = 16

export default function BackgroundMusic() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    let cancelled = false
    let unmuteAttached = false

    function unmuteOnInteraction() {
      audio.muted = false
      setMuted(false)
    }

    function attachUnmuteListeners() {
      if (unmuteAttached) return
      unmuteAttached = true
      window.addEventListener('pointerdown', unmuteOnInteraction, { once: true, capture: true })
      window.addEventListener('keydown', unmuteOnInteraction, { once: true, capture: true })
      window.addEventListener('scroll', unmuteOnInteraction, { once: true, capture: true })
    }

    async function attemptPlay() {
      if (audio.currentTime < START_AT) audio.currentTime = START_AT
      try {
        await audio.play()
        if (!cancelled) setPlaying(true)
      } catch {
        // Autoplay with sound was blocked — fall back to a muted autoplay,
        // then unmute as soon as the visitor interacts with the page at all.
        audio.muted = true
        try {
          await audio.play()
          if (!cancelled) {
            setPlaying(true)
            setMuted(true)
            attachUnmuteListeners()
          }
        } catch {
          if (!cancelled) setPlaying(false)
        }
      }
    }

    if (audio.readyState >= 1) {
      attemptPlay()
    } else {
      audio.addEventListener('loadedmetadata', attemptPlay, { once: true })
    }

    return () => {
      cancelled = true
      audio.removeEventListener('loadedmetadata', attemptPlay)
      window.removeEventListener('pointerdown', unmuteOnInteraction, true)
      window.removeEventListener('keydown', unmuteOnInteraction, true)
      window.removeEventListener('scroll', unmuteOnInteraction, true)
    }
  }, [])

  function toggle() {
    const audio = audioRef.current
    if (!audio) return

    if (audio.muted) {
      audio.muted = false
      setMuted(false)
      setPlaying(true)
      return
    }

    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      if (audio.currentTime < START_AT) audio.currentTime = START_AT
      audio.play().then(() => setPlaying(true))
    }
  }

  return (
    <>
      <audio ref={audioRef} src={`${import.meta.env.BASE_URL}audio/kalyanam.mp3`} loop preload="auto" />
      <button
        className={`music-toggle ${playing ? 'is-playing' : ''}`}
        onClick={toggle}
        aria-label={muted ? 'Unmute background music' : playing ? 'Pause background music' : 'Play background music'}
        title={muted ? 'Tap to unmute' : undefined}
      >
        {playing ? '♪' : '♫'}
      </button>
    </>
  )
}
