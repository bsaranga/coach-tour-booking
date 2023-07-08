import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders greeting', () => {
  render(<App />);
  const greeting = screen.getByText(/Hello world.../i);
  expect(greeting).toBeInTheDocument();
});
