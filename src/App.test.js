import { render, screen } from '@testing-library/react';
import App from './App';

test('renders home page with CategoryBar', () => {
  render(<App />);
  const categoryElement = screen.getByText(/Apollo Products/i);
  expect(categoryElement).toBeInTheDocument();
});
