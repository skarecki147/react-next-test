import { ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import mGlassIcon from '../../assets/mGlassIcon.svg'
import { inputSearchValue, setInputValue } from '../../store/slices/artistsSlice/artistsSlice'
import { AppDispatch } from '../../store/store'
import { CustomInput, SearchBox, SearchIcon } from './styles'

interface ISearchBarProps {
  children: React.ReactNode
  setSearchValue: (inputValue: string) => void
  handleClickSearchButton: () => void
}

const SearchBar = ({ children, setSearchValue, handleClickSearchButton }: ISearchBarProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const inputValue = useSelector(inputSearchValue)
  const handleOnChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const inputValue = event.target.value
    setSearchValue(inputValue)
    dispatch(setInputValue(inputValue))
  }

  return (
    <SearchBox>
      <CustomInput
        className={'search-input'}
        id={'searchQuery'}
        placeholder="Search songs, albums or artists..."
        value={inputValue}
        onChange={handleOnChange}
      />
      <SearchIcon src={mGlassIcon} alt="magnifying glass" onClick={handleClickSearchButton} />
      {children}
    </SearchBox>
  )
}
export default SearchBar
