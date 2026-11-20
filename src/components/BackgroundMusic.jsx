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

    // Regardless of whether autoplay worked, the first scroll, tap, click
    // or keypress on the page reliably (re)starts playback unmuted — this
    // is what actually works on browsers that block all unprompted audio.
    const onFirstInteraction = () => {
      startPlayback()
      window.removeEventListener('scroll', onFirstInteraction)
      window.removeEventListener('pointerdown', onFirstInteraction)
      window.removeEventListener('touchstart', onFirstInteraction)
      window.removeEventListener('keydown', onFirstInteraction)
    }
    window.addEventListener('scroll', onFirstInteraction, { passive: true })
    window.addEventListener('pointerdown', onFirstInteraction)
    window.addEventListener('touchstart', onFirstInteraction, { passive: true })
    window.addEventListener('keydown', onFirstInteraction)

    return () => {
      audio.removeEventListener('loadedmetadata', seekToStart)
      audio.removeEventListener('loadedmetadata', tryAutoplay)
      window.removeEventListener('scroll', onFirstInteraction)
      window.removeEventListener('pointerdown', onFirstInteraction)
      window.removeEventListener('touchstart', onFirstInteraction)
      window.removeEventListener('keydown', onFirstInteraction)
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
