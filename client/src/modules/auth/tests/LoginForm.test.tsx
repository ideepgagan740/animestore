import { screen } from '@testing-library/react';
import { LoginForm } from '@modules/auth/components/LoginForm';
import { renderWithAppProviders } from '@tests/test-utils';

describe('LoginForm', () => {
  it('renders email and password fields', () => {
    renderWithAppProviders(<LoginForm />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });
});
