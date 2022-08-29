import { Box } from '@mui/material'
import { ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import mGlassIcon from '../../assets/mGlassIcon.svg'
import { loadingStatusSelector } from '../../store/slices/artistsSlice/artistsSlice'
import { AppDispatch } from '../../store/store'
import { LoadingStatus } from '../../store/types'
import './SearchBar.css'

interface ISearchBarProps {
  children: React.ReactNode
  setSearchValue: (inputValue: string) => void
}

const SearchBar = (props: ISearchBarProps) => {
  const { children, setSearchValue } = props
  const dispatch = useDispatch<AppDispatch>()

  const loadingStatus = useSelector(loadingStatusSelector)

  const isReady = loadingStatus !== LoadingStatus.NEVER && loadingStatus !== LoadingStatus.SUCCESS
  const handleOnChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const inputValue = event.target.value
    setSearchValue(inputValue)
  }

  // const handleClickSearchButton = () => {
  //   if (searchValue !== '') {
  //     dispatch(fetchArtists(searchValue))
  //     navigate('/result')
  //   }
  // }

  return (
    <Box className={'main-container'}>
      {/* <div className={'title-box'}>
        <img className={'logo-icon'} src={Logo} alt="logo-icon" />
        <p className={'title'}>ReactMusic</p>
      </div> */}
      <div className={'input-box'}>
        <input
          className={'search-input'}
          id={'searchQuery'}
          placeholder="Search songs, albums or artists..."
          onChange={handleOnChange}
        />

        <img className={'search-icon'} src={mGlassIcon} alt="magnifying glass" />
      </div>
      <div className={'btn-box'}>{children}</div>
    </Box>
  )
}
export default SearchBar
