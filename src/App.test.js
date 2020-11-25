import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms))

test('find Load Data button', () => {
  render(<App />);
  expect(screen.getByText('Load Data')).toBeInTheDocument();
});

test('click Load Data button', async () => {
  render(<App />);
  fireEvent.click(screen.getByText(/Load Data/i))
  await timeout(20000);
  const elments = screen.getAllByText(/action_mroot:/)
  expect(elments.length).toBe(10)
}, 25000)