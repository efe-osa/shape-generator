import {act, cleanup, fireEvent, render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import 'fake-indexeddb/auto'
import React from 'react'
import ShapeQueryForm from '../components/ShapeQueryForm'
import {circleAttr, selectInput} from './utils'

afterEach(cleanup)

test('disables draw button', async () => {
  await act(async () => {
    render(<ShapeQueryForm />)
  })
  const drawBtn = screen.getByTestId('draw-btn')
  expect(drawBtn).toBeDisabled()
})

test('validates query form', async () => {
  await act(async () => {
    render(<ShapeQueryForm />)
  })
  const colour = screen.getByTestId('colour')
  const shapeType = screen.getByTestId('shapetype')
  const drawBtn = screen.getByTestId('draw-btn')

  fireEvent.change(shapeType, selectInput(circleAttr.type))
  fireEvent.change(colour, selectInput(circleAttr.colour, 'colour'))

  const radius = screen.getByTestId('radius')
  fireEvent.change(radius, selectInput(`${300}`, 'radius'))

  expect(shapeType).toHaveValue(circleAttr.type)
  expect(colour).toHaveValue(circleAttr.colour)
  expect(radius).toHaveValue(300)

  fireEvent.click(drawBtn)
  const errorMsg = await screen.findByTestId('error')
  expect(errorMsg).toHaveClass('error')
  expect(errorMsg).toBeInTheDocument()
  expect(errorMsg).toHaveTextContent(/invalid/i)
})

test('handles text input change', async () => {
  await act(async () => {
    render(<ShapeQueryForm />)
  })
  const shapeType = screen.getByTestId('shapetype')
  const drawBtn = screen.getByTestId('draw-btn')
  const colour = screen.getByTestId('colour')

  fireEvent.change(shapeType, selectInput(circleAttr.type))
  fireEvent.change(colour, selectInput(circleAttr.colour, 'colour'))

  const radius = await screen.findByTestId('radius')
  fireEvent.change(radius, selectInput(`${circleAttr.radius}`, 'radius'))

  expect(shapeType).toHaveValue(circleAttr.type)
  expect(colour).toHaveValue(circleAttr.colour)
  expect(radius).toHaveValue(circleAttr.radius)
  userEvent.click(drawBtn)
})
