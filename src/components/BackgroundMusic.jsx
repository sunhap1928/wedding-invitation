import { useEffect, useRef, useState } from 'react'

const START_AT = 16

export default function BackgroundMusic() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const seekToStart = () => {
      if (audio.currentTime < START_AT) audio.currentTime = START_AT
    }
    audio.addEventListener('loadedmetadata', seekToStart)

    const startPlayback = () => {
      audio.muted = false
      const begin = () => {
        seekToStart()
        audio.play().then(() => setPlaying(true)).catch(() => {})
      }
      if (audio.readyState >= 1) begin()
      else audio.addEventListener('loadedmetadata', begin, { once: true })
    }

    // Best-effort autoplay for browsers/engagement levels that allow it.
    const tryAutoplay = async () => {
      try {
        await audio.play()
        setPlaying(true)
      } catch {
        try {
          audio.muted = true
          await audio.play()
          setPlaying(true)
        } catch {
          // Blocked entirely — the interaction listeners below will start it.
        }
      }
    }
    if (audio.readyState >= 1) tryAutoplay()
    else audio.addEventListener('loadedmetadata', tryAutoplay, { once: true })

    // Regardless of whether autoplay worked, the first real interaction on
    // the page reliably (re)starts playback unmuted. Browsers only grant
    // the "user activation" audio needs to *completed* gestures — click,
    // touchend, mouseup, keydown — not to scroll/touchstart/pointerdown,
    // since those could just be the start of a scroll rather than a
    // deliberate tap. iOS Safari is looser and also honors scroll, which
    // this list still covers; Android Chrome requires one of the events
    // below, so this is what makes it work there too.
    const interactionEvents = ['click', 'touchend', 'mouseup', 'keydown', 'scroll']
    const onFirstInteraction = (event) => {
      // The toggle button already manages play/pause itself — don't let this
      // generic "unlock audio" handler fight a deliberate pause click on it.
      if (!event.target?.closest?.('.music-toggle')) startPlayback()
      interactionEvents.forEach((type) => window.removeEventListener(type, onFirstInteraction))
    }
    interactionEvents.forEach((type) =>
      window.addEventListener(type, onFirstInteraction, { passive: true }),
    )

    return () => {
      audio.removeEventListener('loadedmetadata', seekToStart)
      audio.removeEventListener('loadedmetadata', tryAutoplay)
      interactionEvents.forEach((type) => window.removeEventListener(type, onFirstInteraction))
    }
  }, [])

  function toggle() {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = false

    if (playing && !audio.paused) {
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
        aria-label={playing ? 'Pause background music' : 'Play background music'}
      >
        {playing ? '♪' : '♫'}
      </button>
    </>
  )
}
