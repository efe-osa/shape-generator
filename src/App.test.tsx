import {render, screen, waitFor} from '@testing-library/react'
import React from 'react'
import App from './App'

test('renders app', async () => {
  render(<App />)
  expect(
    await waitFor(() => screen.getByTestId('app-header')),
  ).toBeInTheDocument()
})
