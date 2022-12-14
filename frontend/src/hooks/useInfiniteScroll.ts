import { Dispatch, SetStateAction, useEffect, useState } from 'react'

const useInfiniteScroll = (
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
    const screenHeight = Math.round(window.innerHeight + document.documentElement.scrollTop)

    if (screenHeight !== document.documentElement.offsetHeight) return
    setIsFetching(true)
  }

  return [isFetching, setIsFetching]
}

export default useInfiniteScroll
