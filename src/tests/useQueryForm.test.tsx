import {renderHook, act} from '@testing-library/react-hooks'
import useQueryForm from '../hooks/useQueryForm'
import {selectInput, circleAttr} from './utils'
import 'fake-indexeddb/auto'
import {cleanup} from '@testing-library/react'

afterEach(cleanup)

describe('test hook', () => {
  const {result, waitForNextUpdate, waitForValueToChange} = renderHook(() =>
    useQueryForm(),
  )

  it('validates query form', async () => {
    await act(() => {
      result.current.handleDrawShape()
    })
    await waitForNextUpdate()
    expect(result.current.error).toContain('Invalid')
  })

  it('updates shape attributes', async () => {
    const newColour = '#ffff00'
    act(() => {
      result.current.handleEditShape(circleAttr)
    })

    await waitForValueToChange(() => result.current.activeId)

    expect(result.current.activeId).toBe(circleAttr.id)
    expect(result.current.currentColour).toBe(circleAttr.colour)
    expect(result.current.currentShapeName).toBe(circleAttr.type)
    expect(result.current.radius).toBe(circleAttr.radius)

    act(() => {
      result.current.handleInputChange(selectInput(newColour, 'colour'))
    })

    await waitForNextUpdate()
    expect(result.current.currentColour).toBe(newColour)

    await act(async () => {
      result.current.handleDrawShape()
    })
    await waitForValueToChange(() => result.current.shapes)
    expect(result.current.shapes?.[0].colour).toBe(newColour)
  })
})
