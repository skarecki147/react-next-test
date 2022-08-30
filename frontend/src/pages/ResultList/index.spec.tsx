import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { initialState } from '../../store/initialStateMock'
import ResultList from './ResultList'

describe('ResultList page', () => {
  const middlewares = [thunk]
  const mockStore = configureStore(middlewares)
  let store, wrapper

  it('The page should contains all necessary titles', () => {
    store = mockStore(initialState)
    const component = render(
      <Router>
        <Provider store={store}>
          <ResultList />
        </Provider>
      </Router>,
    )
    const titleSongs = component.getByText(/Songs/i)
    const titleAlbums = component.getByText(/Albums/i)
    const titleArtists = component.getByText(/Artists/i)

    expect(titleSongs).toBeInTheDocument()
    expect(titleAlbums).toBeInTheDocument()
    expect(titleArtists).toBeInTheDocument()
  })

  it('The page should show column correctly count of artists', () => {
    store = mockStore(initialState)
    const artistName = 'Bob Marley'
    const artistsCount = 1
    const component = render(
      <Router>
        <Provider store={store}>
          <ResultList />
        </Provider>
      </Router>,
    )
    const resultList = component.queryAllByText(artistName)
    expect(resultList).toHaveLength(artistsCount)
  })
})
