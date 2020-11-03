import {act, render, screen} from '@testing-library/react'
import React from 'react'
import 'fake-indexeddb/auto'
import App from './App'

test('renders app', () => {
  act(() => {
    render(<App />)
  })

  const appHeader = screen.getByTestId('app-header')
  expect(appHeader).toBeInTheDocument()
})
