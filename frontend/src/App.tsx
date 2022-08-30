import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'

import Logo from '../src/assets/Logo.svg'
import './App.css'
import {SearchBar} from './components/SearchBar'
import {fetchArtists} from './store/slices/artistsSlice/artistsSlice'
import {AppDispatch} from './store/store'
import {ButtonBox, ButtonText, ButtonWrapper, LogoIcon, MainContainer, Title, TitleBox} from "./styles";

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

        <MainContainer>
            <TitleBox>
                <LogoIcon src={Logo} alt="logo-icon"/>
                <Title>ReactMusic</Title>
            </TitleBox>
            <SearchBar setSearchValue={setSearchValue}>
                <ButtonBox>
                    <ButtonWrapper onClick={handleClickSearchButton}>
                        <ButtonText>Search</ButtonText>
                    </ButtonWrapper>
                    <ButtonWrapper>
                        <ButtonText>I am lucky</ButtonText>
                    </ButtonWrapper>
                </ButtonBox>
            </SearchBar>
        </MainContainer>

    )
}

export default App
