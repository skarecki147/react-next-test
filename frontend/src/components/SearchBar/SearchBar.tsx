import { Box, Button, TextField } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchArtists, loadingStatusSelector } from '../../store/slices/artistsSlice/artistsSlice'
import { AppDispatch } from '../../store/store'
import { LoadingStatus } from '../../store/types'

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
    <Box
      sx={{
        width: 500,
        maxWidth: '100%',
      }}>
      <TextField fullWidth label="fullWidth" id="fullWidth" onChange={handleOnChange} />
      <Button variant="outlined" onClick={handleClickSearchButton}>
        Search
      </Button>
      <Button variant="outlined">I am lucky</Button>
    </Box>
  )
}
export default SearchBar
