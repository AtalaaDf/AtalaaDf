import { useState, useEffect } from 'react'
import { TYPING_PHRASES, TYPING_CONFIG } from '../data/typingPhrases'

export function useTypewriter() {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentPhrase = TYPING_PHRASES[phraseIndex % TYPING_PHRASES.length]
    let timer

    if (!isDeleting) {
      if (displayedText.length < currentPhrase.length) {
        timer = setTimeout(() => {
          setDisplayedText(currentPhrase.slice(0, displayedText.length + 1))
        }, TYPING_CONFIG.typeSpeed)
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true)
        }, TYPING_CONFIG.pauseDelay)
      }
    } else {
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(currentPhrase.slice(0, displayedText.length - 1))
        }, TYPING_CONFIG.deleteSpeed)
      } else {
        timer = setTimeout(() => {
          setIsDeleting(false)
          setPhraseIndex((prev) => (prev + 1) % TYPING_PHRASES.length)
        }, 300)
      }
    }

    return () => clearTimeout(timer)
  }, [displayedText, isDeleting, phraseIndex])

  return { displayedText, isDeleting }
}
