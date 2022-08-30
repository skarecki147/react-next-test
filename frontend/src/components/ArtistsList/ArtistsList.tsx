import { CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import { MouseEventHandler } from 'react'
import artistPhoto from '../../assets/artist.jpg'
import { CardWrapper } from '../../pages/ResultList/styles'
import { IArtists } from '../../store/types'

interface IArtistsListProps {
  listArtists: IArtists[] | undefined
  handleArtistClick: (id: number) => MouseEventHandler<HTMLButtonElement> | undefined
}

const ArtistsList = ({ listArtists, handleArtistClick }: IArtistsListProps) => {
  return (
    <>
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
    </>
  )
}
export default ArtistsList
