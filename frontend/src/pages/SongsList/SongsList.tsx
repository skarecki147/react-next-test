import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useInfiniteScroll from '../../hooks/useInfiniteScroll'
import { albumsSelector, fetchAlbums } from '../../store/slices/albumsSlice/albumsSlice'
import {
  artistsIdSelector,
  artistsSelector,
  loadingStatusSelector,
} from '../../store/slices/artistsSlice/artistsSlice'
import { fetchSongs } from '../../store/slices/songsSlice/songsSlice'
import { AppDispatch } from '../../store/store'

function SongsList() {
  const startCount = 10
  const interval = 10
  const dispatch = useDispatch<AppDispatch>()
  const artists = useSelector(artistsSelector)
  const albums = useSelector(albumsSelector)
  const loadingStatus = useSelector(loadingStatusSelector)
  const [start, setStart] = useState(startCount)
  const [listItems, setListItems] = useState<any>()
  const [isFetching, setIsFetching] = useInfiniteScroll(start, interval, fetchMoreListItems)
  const artistsIds = useSelector(artistsIdSelector)
  const firstArtistsIndex = 0

  useEffect(() => {
    if (artistsIds) {
      dispatch(fetchSongs(artistsIds[firstArtistsIndex]))
      dispatch(fetchAlbums(artistsIds[firstArtistsIndex]))
    }
  }, [artistsIds])

  useEffect(() => {
    console.log('artists', artists)
    console.log('albums', albums)
    const initialSongsList = artists?.slice(0, interval)
    setListItems(initialSongsList)
  }, [artists, albums])

  function fetchMoreListItems() {
    setStart((prev) => {
      return prev + interval
    })
    const croppedSongsList = artists?.slice(start, start + interval)
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
