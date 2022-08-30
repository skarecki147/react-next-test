import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import App from './App'
import { initialState } from './store/initialStateMock'

test('renders learn react link', () => {
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
  const buttonIAmLucky = screen.getByText(/Feeling lucky/i)
  const title = screen.getByText(/ReactMusic/i)

  expect(buttonSearch).toBeInTheDocument()
  expect(buttonIAmLucky).toBeInTheDocument()
  expect(title).toBeInTheDocument()
})
