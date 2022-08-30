import Heart from '../../assets/Heart.svg'
import { HeartIcon, LinkWrapper, SongIcon, SongRow, SongTitle } from '../../pages/ResultList/styles'
import { ISong } from '../../store/types'

interface ISongListProps {
  listSongs: ISong[] | undefined
}

const SongList = ({ listSongs }: ISongListProps) => {
  return (
    <>
      {listSongs?.map((song, index) => (
        <SongRow key={song.trackId + index}>
          <SongIcon src={song.artworkUrl60} alt={'Song image '} />
          <LinkWrapper href={song.trackViewUrl} target="_blank">
            <SongTitle>{song.trackCensoredName}</SongTitle>
          </LinkWrapper>
          <HeartIcon src={Heart} alt={'Heart icon'} />
        </SongRow>
      ))}
    </>
  )
}
export default SongList
