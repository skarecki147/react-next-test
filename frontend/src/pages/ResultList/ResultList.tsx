import { Grid, Skeleton } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AlbumsList } from '../../components/AlbumsList'
import ArtistsList from '../../components/ArtistsList/ArtistsList'
import { SearchBar } from '../../components/SearchBar'
import { SongList } from '../../components/SongList'
import useInfiniteScroll from '../../hooks/useInfiniteScroll'
import {
  albumsSelector,
  fetchAlbums,
  loadingAlbumsStatusSelector,
} from '../../store/slices/albumsSlice/albumsSlice'
import {
  artistsIdSelector,
  artistsSelector,
  fetchArtists,
  loadingArtistsStatusSelector,
  resetArtistId,
} from '../../store/slices/artistsSlice/artistsSlice'
import {
  fetchSongs,
  loadingSongsStatusSelector,
  songsSelector,
} from '../../store/slices/songsSlice/songsSlice'
import { AppDispatch } from '../../store/store'
import { IAlbum, IArtists, ISong, LoadingStatus } from '../../store/types'
import {
  AppBar,
  ButtonText,
  ButtonWrapper,
  CardsColumn,
  ColumnTitle,
  MainContainer,
  SearchRow,
  SkeletonWrapper,
  SongSkeletonWrapper,
} from './styles'

function ResultList() {
  const startCount = 10
  const interval = 10
  const dispatch = useDispatch<AppDispatch>()
  const artists = useSelector(artistsSelector)
  const albums = useSelector(albumsSelector)
  const songs = useSelector(songsSelector)
  const loadingArtistsStatus = useSelector(loadingArtistsStatusSelector)
  const isLoadingArtists = loadingArtistsStatus === LoadingStatus.LOADING
  const loadingAlbumsStatus = useSelector(loadingAlbumsStatusSelector)
  const isLoadingAlbums = loadingAlbumsStatus === LoadingStatus.LOADING
  const loadingSongsStatus = useSelector(loadingSongsStatusSelector)
  const isLoadingSongs = loadingSongsStatus === LoadingStatus.LOADING
  const [start, setStart] = useState(startCount)
  const [listSongs, setListSongs] = useState<ISong[] | undefined>(undefined)
  const [listAlbums, setListAlbums] = useState<IAlbum[] | undefined>(undefined)
  const [listArtists, setListArtists] = useState<IArtists[] | undefined>(undefined)
  const [searchValue, setSearchValue] = useState('')

  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems)
  const artistsIds = useSelector(artistsIdSelector)
  const firstArtistsIndex = 0

  useEffect(() => {
    return () => {
      dispatch(resetArtistId())
    }
  }, [])

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
  }, [songs, artists, albums])

  const handleClickSearchButton = () => {
    if (searchValue !== '') {
      dispatch(fetchArtists(searchValue))
      setStart(startCount)
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
    dispatch(fetchSongs(artistId))
    dispatch(fetchAlbums(artistId))
  }

  return (
    <MainContainer>
      <AppBar>
        <SearchRow>
          <SearchBar
            setSearchValue={setSearchValue}
            handleClickSearchButton={handleClickSearchButton}>
            <ButtonWrapper onClick={handleClickSearchButton}>
              <ButtonText>Search</ButtonText>
            </ButtonWrapper>
          </SearchBar>
        </SearchRow>
      </AppBar>
      <Grid container direction="row" spacing={2}>
        <Grid item xs>
          <ColumnTitle>Songs</ColumnTitle>
          {listSongs?.length === 0 && <ColumnTitle>No results found.</ColumnTitle>}
          {isLoadingSongs ? (
            <CardsColumn>
              {Array.from(Array(10).keys()).map((_, index) => (
                <SongSkeletonWrapper key={index + 10000}>
                  <Skeleton variant="rounded" width={500} height={65} />
                </SongSkeletonWrapper>
              ))}
            </CardsColumn>
          ) : (
            <CardsColumn>
              <SongList listSongs={listSongs} />
            </CardsColumn>
          )}
        </Grid>
        <Grid item xs>
          <ColumnTitle>Albums</ColumnTitle>

          {isLoadingAlbums ? (
            <CardsColumn>
              {Array.from(Array(10).keys()).map((_, index) => (
                <SkeletonWrapper key={index + 100}>
                  <Skeleton variant="rounded" width={200} height={170} />
                </SkeletonWrapper>
              ))}
            </CardsColumn>
          ) : (
            <CardsColumn>
              {listAlbums?.length === 0 && <ColumnTitle>No results found.</ColumnTitle>}
              <AlbumsList listAlbums={listAlbums} />
            </CardsColumn>
          )}
        </Grid>

        <Grid item xs>
          <ColumnTitle>Artists</ColumnTitle>
          {isLoadingArtists ? (
            <CardsColumn>
              {Array.from(Array(10).keys()).map((_, index) => (
                <SkeletonWrapper key={index + 1000}>
                  <Skeleton variant="rounded" width={200} height={170} />{' '}
                </SkeletonWrapper>
              ))}
            </CardsColumn>
          ) : (
            <CardsColumn>
              {listArtists?.length === 0 && <ColumnTitle>No results found.</ColumnTitle>}
              <ArtistsList listArtists={listArtists} handleArtistClick={handleArtistClick} />
            </CardsColumn>
          )}
        </Grid>
      </Grid>
    </MainContainer>
  )
}

export default ResultList
