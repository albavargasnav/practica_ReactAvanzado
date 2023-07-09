import { fireEvent, render, screen } from '@testing-library/react';
import LoginPage from '../LoginPage';
import { Provider } from 'react-redux';
import { defaultState } from '../../../store/reducers';
import { authLogin, uiResetError } from '../../../store/actions';

jest.mock('../../../store/actions');

describe('LoginPage', () => {
  const renderComponent = (error = null) => {
    const store = {
      getState: () => {
        const state = defaultState;
        state.ui.error = error;

        return state;
      },
      subscribe: () => {},
      dispatch: () => {},
    };
    return render(
      <Provider store={store}>
        <LoginPage />
      </Provider>,
    );
  };

  test('snapshot', () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  test('should dispatch authLogin action', () => {
    const email = 'david';
    const password = '1234';

    renderComponent();

    const emailInput = screen.getByLabelText(/Email/);
    const passwordInput = screen.getByLabelText(/password/);
    const submitButton = screen.getByRole('button');

    expect(submitButton).toBeDisabled();

    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });

    expect(submitButton).toBeEnabled();

    fireEvent.click(submitButton);

    expect(authLogin).toHaveBeenCalledWith({ email, password});
    console.log (email, password)
  });

  test('should display an error', () => {
    const error = { message: 'Unauthorized' };
    renderComponent(error);

    const errorElement = screen.getByText(error.message);
    expect(errorElement).toBeInTheDocument();

    fireEvent.click(errorElement);

    expect(uiResetError).toHaveBeenCalled();
  });
});