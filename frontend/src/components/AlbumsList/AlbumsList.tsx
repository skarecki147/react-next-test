import { Avatar, Link } from '@mui/material'
import { CardWrapper } from '../../pages/ResultList/styles'
import { IAlbum } from '../../store/types'

interface IAlbumsListProps {
  listAlbums: IAlbum[] | undefined
}

const AlbumsList = ({ listAlbums }: IAlbumsListProps) => {
  return (
    <>
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
    </>
  )
}
export default AlbumsList
