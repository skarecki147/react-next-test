import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import App from './App'
import { LoadingStatus } from './store/types'

test('renders learn react link', () => {
  const initialState = { artists: undefined, artistsId: undefined, status: LoadingStatus.NEVER }
  const mockStore = configureStore()
  const store = mockStore(initialState)

  render(
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>,
  )
  const buttonSearch = screen.getByText(/Search/i)
  const buttonIAmLucky = screen.getByText(/I am lucky/i)

  expect(buttonSearch).toBeInTheDocument()
  expect(buttonIAmLucky).toBeInTheDocument()
})
