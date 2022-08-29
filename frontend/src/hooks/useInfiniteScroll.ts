import { Dispatch, SetStateAction, useEffect, useState } from 'react'

const useInfiniteScroll = (
  start: number,
  interval: number,
  fetchMoreListItems: () => void,
): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!isFetching) return
    fetchMoreListItems()
    setIsFetching(false)
  }, [isFetching])

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return
    setIsFetching(true)
  }

  return [isFetching, setIsFetching]
}

export default useInfiniteScroll
