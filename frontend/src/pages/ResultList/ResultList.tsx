import { Avatar, CardActionArea, Grid, Link, Skeleton, Typography } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import artistPhoto from '../../assets/artist.jpg'
import Heart from '../../assets/Heart.svg'
import Logo from '../../assets/Logo.svg'
import { SearchBar } from '../../components/SearchBar'
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
  CardWrapper,
  ColumnTitle,
  HeartIcon,
  LinkWrapper,
  LogoIcon,
  MainContainer,
  SearchRow,
  SkeletonWrapper,
  SongIcon,
  SongRow,
  SongSkeletonWrapper,
  SongTitle,
} from './styles'

function ResultList() {
  const startCount = 10
  const interval = 10
  const dispatch = useDispatch<AppDispatch>()
  const artists = useSelector(artistsSelector)
  const albums = useSelector(albumsSelector)
  const songs = useSelector(songsSelector)
  const navigate = useNavigate()
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

  const [isFetching, setIsFetching] = useInfiniteScroll(start, interval, fetchMoreListItems)
  const artistsIds = useSelector(artistsIdSelector)
  const firstArtistsIndex = 0

  useEffect(() => {
    console.log('artistsIds', artistsIds)
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
      console.log('listSongs---->', listSongs)
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

  const handleClickLogo = () => {
    navigate('/')
  }

  return (
    <MainContainer>
      <AppBar>
        <LogoIcon src={Logo} alt="logo-icon" onClick={handleClickLogo} />
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
              {listSongs?.map((song, index) => (
                <SongRow key={song.trackId + index}>
                  <SongIcon src={song.artworkUrl60} alt={'Song image '} />
                  <LinkWrapper href={song.trackViewUrl} target="_blank">
                    <SongTitle>{song.trackCensoredName}</SongTitle>
                  </LinkWrapper>
                  <HeartIcon src={Heart} alt={'Heart icon'} />
                </SongRow>
              ))}
            </CardsColumn>
          )}
        </Grid>
        <Grid item xs>
          <Typography gutterBottom variant="h4">
            Albums
          </Typography>
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
              {listAlbums?.map((album, index) => (
                <CardWrapper key={album.artistId + index}>
                  <Link href={album.collectionViewUrl} target="_blank">
                    <Avatar
                      alt={album.collectionName}
                      src={album.artworkUrl100}
                      variant="square"
                      sx={{ width: '200px', height: '200px' }}
                    />
                  </Link>
                </CardWrapper>
              ))}
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
              {listArtists?.map((artist, index) => (
                <CardWrapper key={artist.artistId + index}>
                  <CardActionArea onClick={handleArtistClick(artist.amgArtistId)}>
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
          )}
        </Grid>
      </Grid>
    </MainContainer>
  )
}

export default ResultList
