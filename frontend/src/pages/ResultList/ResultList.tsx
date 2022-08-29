import { Button, CardActionArea, Grid, Typography } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import artistPhoto from '../../assets/artist.jpg'
import { SearchBar } from '../../components/SearchBar'
import useInfiniteScroll from '../../hooks/useInfiniteScroll'
import { albumsSelector, fetchAlbums } from '../../store/slices/albumsSlice/albumsSlice'
import {
  artistsIdSelector,
  artistsSelector,
  fetchArtists,
  loadingStatusSelector,
} from '../../store/slices/artistsSlice/artistsSlice'
import { fetchSongs, songsSelector } from '../../store/slices/songsSlice/songsSlice'
import { AppDispatch } from '../../store/store'
import { IAlbum, IArtists, ISong } from '../../store/types'
import { CardsColumn, CardWrapper } from './styles'

function ResultList() {
  const startCount = 10
  const interval = 10
  const dispatch = useDispatch<AppDispatch>()
  const artists = useSelector(artistsSelector)
  const albums = useSelector(albumsSelector)
  const songs = useSelector(songsSelector)
  const loadingStatus = useSelector(loadingStatusSelector)
  const [start, setStart] = useState(startCount)
  const [listSongs, setListSongs] = useState<ISong[] | undefined>(undefined)
  const [listAlbums, setListAlbums] = useState<IAlbum[] | undefined>(undefined)
  const [listArtists, setListArtists] = useState<IArtists[] | undefined>(undefined)
  const [searchValue, setSearchValue] = useState('')

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
    const initialSongsList = songs?.slice(0, interval)
    const initialArtistsList = artists?.slice(0, interval)
    const initialAlbumsList = albums?.slice(0, interval)
    setListSongs(initialSongsList)
    setListArtists(initialArtistsList)
    setListAlbums(initialAlbumsList)
    console.log('listSongs', listSongs)
    console.log('listAlbums', listAlbums)
    console.log('listArtists', listArtists)
  }, [songs, artists, albums])

  const handleClickSearchButton = () => {
    if (searchValue !== '') {
      dispatch(fetchArtists(searchValue))
    }
  }

  function fetchMoreListItems() {
    setStart((prev) => {
      return prev + interval
    })
    const croppedSongsList = songs?.slice(start, start + interval)
    const croppedAlbumsList = albums?.slice(start, start + interval)
    const croppedArtistsList = artists?.slice(start, start + interval)

    if (listSongs && croppedSongsList) {
      setListSongs([...listSongs, ...croppedSongsList])
    }
    if (listAlbums && croppedAlbumsList) {
      setListAlbums([...listAlbums, ...croppedAlbumsList])
    }
    if (listArtists && croppedArtistsList) {
      setListArtists([...listArtists, ...croppedArtistsList])
    }

    setIsFetching(false)
  }

  const handleArtistClick = (artistId: number) => () => {
    console.log('artistId', artistId)
    dispatch(fetchSongs(artistId))
    dispatch(fetchAlbums(artistId))
  }

  return (
    <>
      <SearchBar setSearchValue={setSearchValue}>
        <Button className={'btn'} variant="outlined" onClick={handleClickSearchButton}>
          <span className={'button-text'}>Search</span>
        </Button>
      </SearchBar>
      <Grid container direction="row" spacing={2}>
        <Grid item xs>
          <Typography gutterBottom variant="h4">
            Songs
          </Typography>
          <div>
            {isFetching && <h1>Loading...</h1>}
            <ul>
              {listSongs?.map((song) => (
                <li key={song.trackId}>
                  <h1 style={{ marginBottom: '50px' }}>{song.trackCensoredName}</h1>
                </li>
              ))}
            </ul>
          </div>
        </Grid>
        <Grid item xs>
          <div>
            <Typography gutterBottom variant="h4">
              Albums
            </Typography>
            <ul>
              {listAlbums?.map((album) => (
                <li key={album.collectionId}>
                  <h1 style={{ marginBottom: '50px' }}>{album.collectionCensoredName}</h1>
                </li>
              ))}
            </ul>
          </div>
        </Grid>

        <Grid item xs>
          <Typography gutterBottom variant="h4">
            Artists
          </Typography>
          <CardsColumn>
            {listArtists?.map((artist) => (
              <CardWrapper>
                <CardActionArea>
                  <CardMedia component="img" height="120" image={artistPhoto} alt="No photo" />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {artist.artistName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {artist.primaryGenreName}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </CardWrapper>
            ))}
          </CardsColumn>
          {/* <div>
            <Typography variant="h4">Artists</Typography>
            <ul>
              {listArtists?.map((artist) => (
                <h1 style={{ marginBottom: '50px' }}>
                  <li key={artist.amgArtistId} onClick={handleArtistClick(artist.amgArtistId)}>
                    {artist.artistName}
                  </li>
                </h1>
              ))}
            </ul>
          </div> */}
        </Grid>
      </Grid>
    </>
  )
}

export default ResultList
