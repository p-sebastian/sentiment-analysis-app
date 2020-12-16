import {useEffect} from 'react'

export const useDark = () => {
  const preference = window.matchMedia('(prefers-color-scheme: dark)')

  useEffect(() => {
    // force light theme
    preference.addListener(() => toggleDark(false))
    return () => preference.removeListener(null)
  }, [])
}

const toggleDark = (shouldAdd: boolean) => {
  document.body.classList.toggle('dark', shouldAdd)
}
