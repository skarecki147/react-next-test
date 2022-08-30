import {ChangeEvent} from 'react'
import {useDispatch} from 'react-redux'
import mGlassIcon from '../../assets/mGlassIcon.svg'

import {AppDispatch} from '../../store/store'

import {CustomInput, SearchBox, SearchIcon} from "./styles";

interface ISearchBarProps {
    children: React.ReactNode
    setSearchValue: (inputValue: string) => void
}

const SearchBar = (props: ISearchBarProps) => {
    const {children, setSearchValue} = props
    const dispatch = useDispatch<AppDispatch>()


    const handleOnChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const inputValue = event.target.value
        setSearchValue(inputValue)
    }
    return (
        <SearchBox>
            <CustomInput
                className={'search-input'}
                id={'searchQuery'}
                placeholder="Search songs, albums or artists..."
                onChange={handleOnChange}
            />
            <SearchIcon src={mGlassIcon} alt="magnifying glass"/>
            {children}
        </SearchBox>
    )
}
export default SearchBar
