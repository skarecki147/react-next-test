import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useInfiniteScroll from '../../hooks/useInfiniteScroll'
import { loadingStatusSelector, songSelector } from '../../store/slices/songsSlice/songsSlice'
import { AppDispatch } from '../../store/store'

function SongsList() {
  const startCount = 10
  const interval = 10
  const dispatch = useDispatch<AppDispatch>()
  const songs = useSelector(songSelector)
  const loadingStatus = useSelector(loadingStatusSelector)
  const [start, setStart] = useState(startCount)
  const [listItems, setListItems] = useState<any>()
  const [isFetching, setIsFetching] = useInfiniteScroll(start, interval, fetchMoreListItems)

  useEffect(() => {
    console.log('songs', songs)
    const initialSongsList = songs?.slice(0, interval)
    setListItems(initialSongsList)
  }, [songs])

  function fetchMoreListItems() {
    setStart((prev) => {
      return prev + interval
    })
    const croppedSongsList = songs?.slice(start, start + interval)
    if (listItems && croppedSongsList) {
      setListItems([...listItems, ...croppedSongsList])
    }
    setIsFetching(false)
  }

  return (
    <>
      <h1>song list</h1>
    </>
  )
}

export default SongsList
