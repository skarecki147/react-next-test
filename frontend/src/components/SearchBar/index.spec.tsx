import { Button } from '@mui/material'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import SearchBar from './SearchBar'

describe('SearchBar component', () => {
  const initialState = { artists: undefined, artistsId: undefined, status: 'NEVER' }
  const mockStore = configureStore()
  let store, wrapper

  it('The form should contain all the necessary input fields and buttons', () => {
    store = mockStore(initialState)
    const handleClickSearchButton = jest.fn()
    const setSearchValue = jest.fn()
    const component = render(
      <Router>
        <Provider store={store}>
          <SearchBar setSearchValue={setSearchValue}>
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

  //   it('When submitting a form with empty fields, shuld show a warning text', async () => {
  //     store = mockStore(initialState);
  //     const component = render(
  //       <Provider store={store}>
  //         <SignInForm />
  //       </Provider>,
  //     );
  //     const form = component.getByTestId('form-container');
  //     fireEvent.submit(form);
  //     await waitFor(() =>
  //       expect(component.getByText('email is a required field')).toBeInTheDocument(),
  //     );
  //     await waitFor(() =>
  //       expect(component.getByText('password is a required field')).toBeInTheDocument(),
  //     );
  //   });

  //   it('When submitting a form email should be correct, and password input should be not empty', async () => {
  //     store = mockStore(initialState);
  //     const component = render(
  //       <Provider store={store}>
  //         <SignInForm />
  //       </Provider>,
  //     );
  //     const form = component.getByTestId('form-container');
  //     const emailInput = component.getByPlaceholderText('e-mail');

  //     fireEvent.change(emailInput, { target: { value: 'test' } });
  //     fireEvent.submit(form);
  //     await waitFor(() =>
  //       expect(component.getByText('email must be a valid email')).toBeInTheDocument(),
  //     );
  //     await waitFor(() =>
  //       expect(component.getByText('password is a required field')).toBeInTheDocument(),
  //     );
  //   });
  //   it('When submitting a form correct email and password should not show error messages', async () => {
  //     store = mockStore(initialState);
  //     const component = render(
  //       <Provider store={store}>
  //         <SignInForm />
  //       </Provider>,
  //     );
  //     const form = component.getByTestId('form-container');
  //     const emailInput = component.getByPlaceholderText('e-mail');
  //     const passwordInput = component.getByPlaceholderText('password');

  //     fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
  //     fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

  //     fireEvent.submit(form);
  //     await waitFor(() =>
  //       expect(component.queryByText('email must be a valid email')).not.toBeInTheDocument(),
  //     );
  //     await waitFor(() =>
  //       expect(component.queryByText('password is a required field')).not.toBeInTheDocument(),
  //     );
  //   });
})
