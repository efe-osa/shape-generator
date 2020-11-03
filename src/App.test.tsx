import {render, screen} from '@testing-library/react'
import 'fake-indexeddb/auto'
import React from 'react'
import App from './App'

test('renders app', () => {
  render(<App />)
  const appHeader = screen.getByTestId('app-header')
  expect(appHeader).toBeInTheDocument()
})
