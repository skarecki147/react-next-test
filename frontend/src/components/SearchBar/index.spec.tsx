import { Button } from '@mui/material'
import { render, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import { initialState } from '../../store/initialStateMock'
import SearchBar from './SearchBar'

describe('SearchBar component', () => {
  const mockStore = configureStore()
  let store, wrapper

  it('The page should contain all the necessary input fields and buttons', () => {
    store = mockStore(initialState)
    const handleClickSearchButton = jest.fn()
    const setSearchValue = jest.fn()
    const component = render(
      <Router>
        <Provider store={store}>
          <SearchBar
            setSearchValue={setSearchValue}
            handleClickSearchButton={handleClickSearchButton}>
            <Button variant="outlined" onClick={handleClickSearchButton}>
              <span>Search</span>
            </Button>
            <Button variant="outlined">
              <span>I am lucky</span>
            </Button>
          </SearchBar>
        </Provider>
      </Router>,
    )
    const searchInput = component.getByPlaceholderText('Search songs, albums or artists...')
    const buttonSearch = component.getByText(/Search/i)
    const buttonIAmLucky = component.getByText(/I am lucky/i)

    expect(searchInput).toBeInTheDocument()
    expect(buttonSearch).toBeInTheDocument()
    expect(buttonIAmLucky).toBeInTheDocument()
  })

  it('The input should be empty', () => {
    store = mockStore(initialState)
    const handleClickSearchButton = jest.fn()
    const setSearchValue = jest.fn()
    const component = render(
      <Router>
        <Provider store={store}>
          <SearchBar
            setSearchValue={setSearchValue}
            handleClickSearchButton={handleClickSearchButton}>
            <Button variant="outlined" onClick={handleClickSearchButton}>
              <span>Search</span>
            </Button>
            <Button variant="outlined">
              <span>I am lucky</span>
            </Button>
          </SearchBar>
        </Provider>
      </Router>,
    )
    const searchInput = component.getByPlaceholderText('Search songs, albums or artists...')
    expect(searchInput.textContent).toEqual('')
  })

  it('After click buttons callback should be called once', async () => {
    store = mockStore(initialState)
    const handleClickSearchButton = jest.fn()
    const setSearchValue = jest.fn()
    const component = render(
      <Router>
        <Provider store={store}>
          <SearchBar
            setSearchValue={setSearchValue}
            handleClickSearchButton={handleClickSearchButton}>
            <Button variant="outlined" onClick={handleClickSearchButton}>
              <span>Search</span>
            </Button>
            <Button variant="outlined">
              <span>I am lucky</span>
            </Button>
          </SearchBar>
        </Provider>
      </Router>,
    )
    const buttonSearch = component.getByText(/Search/i)
    buttonSearch.click()
    await waitFor(() => expect(handleClickSearchButton).toHaveBeenCalledTimes(1))
  })
})
