import { Button } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Logo from '../src/assets/Logo.svg'
import './App.css'
import { SearchBar } from './components/SearchBar'
import { fetchArtists } from './store/slices/artistsSlice/artistsSlice'
import { AppDispatch } from './store/store'

function App() {
  const [searchValue, setSearchValue] = useState('')
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const handleClickSearchButton = () => {
    if (searchValue !== '') {
      dispatch(fetchArtists(searchValue))
      navigate('/result')
    }
  }

  return (
    <>
      <div className={'title-box'}>
        <img className={'logo-icon'} src={Logo} alt="logo-icon" />
        <p className={'title'}>ReactMusic</p>
      </div>
      <SearchBar setSearchValue={setSearchValue}>
        <Button className={'btn'} variant="outlined" onClick={handleClickSearchButton}>
          <span className={'button-text'}>Search</span>
        </Button>
        <Button className={'btn'} variant="outlined">
          <span className={'button-text'}>I am lucky</span>
        </Button>
      </SearchBar>
    </>
  )
}

export default App
