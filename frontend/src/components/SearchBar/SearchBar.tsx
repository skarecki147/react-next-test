import { Box, Button, TextField } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchArtists, loadingStatusSelector } from '../../store/slices/artistsSlice/artistsSlice'
import { AppDispatch } from '../../store/store'
import { LoadingStatus } from '../../store/types'
import mGlassIcon from '../../assets/mGlassIcon.svg'
import Logo from '../../assets/Logo.svg'
import './SearchBar.css'
function SearchBar() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const [searchValue, setSearchValue] = useState('')
  const loadingStatus = useSelector(loadingStatusSelector)

  const isReady = loadingStatus !== LoadingStatus.NEVER && loadingStatus !== LoadingStatus.SUCCESS
  const handleOnChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const inputValue = event.target.value
    setSearchValue(inputValue)
  }

  const handleClickSearchButton = () => {
    if (searchValue !== '') {
      dispatch(fetchArtists(searchValue))
      navigate('/songslist')
    }
  }

  return (
      <Box className={'main-container'}>

          <div className={'title-box'}>
              <img className={'logo-icon'} src={Logo} alt="logo-icon"/>
              <p className={'title'}>ReactMusic</p>
          </div>
          <div className={'input-box'}>
              {/*<TextField className={'search-input'} label="Search" id="fullWidth" onChange={handleOnChange}/>*/}
              <input className={'search-input'} id={'searchQuery'} placeholder="Search songs, albums or artists..."
                     onChange={handleOnChange}/>
              {/*<Input className={'search-input'} onChange={handleOnChange}/>*/}
              <img className={'search-icon'} src={mGlassIcon} alt="magnifying glass"/>
          </div>
          <div className={'btn-box'}>
              <Button className={'btn'} variant="outlined" onClick={handleClickSearchButton}>
                  <span className={'button-text'}>Search</span>
              </Button>
              <Button className={'btn'} variant="outlined"><span className={'button-text'}>I am lucky</span></Button>
          </div>
      </Box>
  )
}
export default SearchBar
