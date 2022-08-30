import {Avatar, CardActionArea, Grid, Skeleton, Typography} from '@mui/material'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import artistPhoto from '../../assets/artist.jpg'
import {SearchBar} from '../../components/SearchBar'
import useInfiniteScroll from '../../hooks/useInfiniteScroll'
import {albumsSelector, fetchAlbums, loadingAlbumsStatusSelector} from '../../store/slices/albumsSlice/albumsSlice'
import {
    artistsIdSelector,
    artistsSelector,
    fetchArtists,
    loadingArtistsStatusSelector,
} from '../../store/slices/artistsSlice/artistsSlice'
import {fetchSongs, loadingSongsStatusSelector, songsSelector} from '../../store/slices/songsSlice/songsSlice'
import {AppDispatch} from '../../store/store'
import {IAlbum, IArtists, ISong, LoadingStatus} from '../../store/types'
import {
    AppBar,
    ButtonText,
    ButtonWrapper,
    CardsColumn,
    CardWrapper,
    ColumnTitle,
    HeartIcon,
    LogoIcon,
    MainContainer,
    SearchRow,
    SkeletonWrapper,
    SongIcon,
    SongRow,
    SongSkeletonWrapper,
    SongTitle
} from './styles'
import Heart from '../../assets/Heart.svg'
import Logo from "../../assets/Logo.svg";

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
    // const loadingStatus = useSelector(loadingStatusSelector)
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
            console.log('listSongs---->', listSongs);
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
        <MainContainer>
            <AppBar>
                <LogoIcon src={Logo} alt="logo-icon"/>
                <SearchRow>
                    <SearchBar setSearchValue={setSearchValue}>
                        <ButtonWrapper onClick={handleClickSearchButton}>
                            <ButtonText>Search</ButtonText>
                        </ButtonWrapper>
                    </SearchBar>
                </SearchRow>
            </AppBar>
            <Grid container direction="row"
                  spacing={2}>
                <Grid item xs>
                    <ColumnTitle>
                        Songs
                    </ColumnTitle>
                    {isLoadingSongs ? (
                            <CardsColumn>
                                {Array.from(Array(10).keys()).map(() => (
                                    <SongSkeletonWrapper>
                                        <Skeleton variant="rounded" width={500} height={65}/>
                                    </SongSkeletonWrapper>
                                ))}
                            </CardsColumn>
                        ) :
                        (
                            <CardsColumn>
                                {listSongs?.map((song) => (
                                    <SongRow key={song.trackId}>
                                        <SongIcon src={song.artworkUrl60} alt={'Song image '}/>
                                        <SongTitle>{song.trackCensoredName}</SongTitle>
                                        <HeartIcon src={Heart} alt={'Heart icon'}/>
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
                            {Array.from(Array(10).keys()).map(() => (
                                <SkeletonWrapper>
                                    <Skeleton variant="rounded" width={200} height={170}/>{' '}
                                </SkeletonWrapper>
                            ))}
                        </CardsColumn>
                    ) : (
                        <CardsColumn>
                            {listAlbums?.map((album) => (
                                <CardWrapper>
                                    <Avatar
                                        alt={album.collectionName}
                                        src={album.artworkUrl100}
                                        variant="square"
                                        sx={{width: '200px', height: '200px'}}
                                    />
                                </CardWrapper>
                            ))}
                        </CardsColumn>
                    )}
                </Grid>

                <Grid item xs>
                    <ColumnTitle>
                        Artists
                    </ColumnTitle>
                    {isLoadingArtists ? (
                        <CardsColumn>
                            {Array.from(Array(10).keys()).map(() => (
                                <SkeletonWrapper>
                                    <Skeleton variant="rounded" width={200} height={170}/>{' '}
                                </SkeletonWrapper>
                            ))}
                        </CardsColumn>
                    ) : (
                        <CardsColumn>
                            {listArtists?.map((artist) => (
                                <CardWrapper>
                                    <CardActionArea onClick={handleArtistClick(artist.amgArtistId)}>
                                        <CardMedia component="img" height="120" image={artistPhoto} alt="No photo"/>
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
