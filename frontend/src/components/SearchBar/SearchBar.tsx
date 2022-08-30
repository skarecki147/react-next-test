import { ChangeEvent } from 'react'
import mGlassIcon from '../../assets/mGlassIcon.svg'

import { CustomInput, SearchBox, SearchIcon } from './styles'

interface ISearchBarProps {
  children: React.ReactNode
  setSearchValue: (inputValue: string) => void
  handleClickSearchButton: () => void
}

const SearchBar = (props: ISearchBarProps) => {
  const { children, setSearchValue, handleClickSearchButton } = props

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
      <SearchIcon src={mGlassIcon} alt="magnifying glass" onClick={handleClickSearchButton} />
      {children}
    </SearchBox>
  )
}
export default SearchBar
