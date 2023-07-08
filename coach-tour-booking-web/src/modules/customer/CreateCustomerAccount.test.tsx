import { render, screen } from '@testing-library/react';
import CreateCustomerAccount from './CreateCustomerAccount';

test('CreateCustomerAccount renders form', () => {
  render(<CreateCustomerAccount/>);
  const element = screen.getByTestId("create-account");
  expect(element).toBeInTheDocument();
});
