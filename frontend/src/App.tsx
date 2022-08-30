import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Logo from '../src/assets/Logo.svg'
import { SearchBar } from './components/SearchBar'
import { fetchArtists } from './store/slices/artistsSlice/artistsSlice'
import { AppDispatch } from './store/store'
import {
  ButtonBox,
  ButtonText,
  ButtonWrapper,
  LogoIcon,
  MainContainer,
  Title,
  TitleBox,
} from './styles'

const App = () => {
  const [searchValue, setSearchValue] = useState('')
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const artistList = [
    'Bob Marley',
    'Eminem',
    'Bob Dylan',
    'The Beatles',
    'Deep Purple',
    'Iron Maiden',
    'Metallica',
    'Rammstein',
    'Benny Benassi',
    'Skrillex',
    'red hot chili peppers',
    'the doors',
  ]

  const handleClickSearchButton = () => {
    if (searchValue !== '') {
      dispatch(fetchArtists(searchValue))
      navigate('/result')
    }
  }

  const handleRandomSearch = () => {
    const randomArtist = artistList[Math.floor(Math.random() * artistList.length)]
    dispatch(fetchArtists(randomArtist))
    navigate('/result')
  }

  return (
    <MainContainer>
      <TitleBox>
        <LogoIcon src={Logo} alt="logo-icon" />
        <Title>ReactMusic</Title>
      </TitleBox>
      <SearchBar setSearchValue={setSearchValue} handleClickSearchButton={handleClickSearchButton}>
        <ButtonBox>
          <ButtonWrapper onClick={handleClickSearchButton}>
            <ButtonText>Search</ButtonText>
          </ButtonWrapper>
          <ButtonWrapper>
            <ButtonText onClick={handleRandomSearch}>Feeling lucky</ButtonText>
          </ButtonWrapper>
        </ButtonBox>
      </SearchBar>
    </MainContainer>
  )
}

export default App
