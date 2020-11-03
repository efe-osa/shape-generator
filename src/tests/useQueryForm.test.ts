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
    act(() => {
      result.current.handleDrawShape()
    })
    await waitForNextUpdate()
    expect(result.current.error).toContain('Invalid')
  })

  it('saves shape', async () => {
    act(() => {
      result.current.handleSelectShape(selectInput(circleAttr.type))
      result.current.handleInputChange(selectInput(circleAttr.colour, 'colour'))
      result.current.handleInputChange(
        selectInput(`${circleAttr.radius}`, 'radius'),
      )
    })
    await waitForNextUpdate()
    console.log('result.current', result.current)
    expect(result.current.currentShapeName).toBe(circleAttr.type)
    expect(result.current.radius).toBe(circleAttr.radius)
    expect(result.current.currentColour).toBe(circleAttr.colour)

    //add shape
    act(() => {
      result.current.handleDrawShape()
    })
    await waitForValueToChange(() => result.current.shapes)
    expect(result.current.shapes).not.toHaveLength(0)
  })

  it('updates shape attributes', async () => {
    const newShape = 'ellipse'
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
      result.current.handleSelectShape(selectInput(newShape))
      result.current.handleInputChange(selectInput(newColour, 'colour'))
    })

    await waitForNextUpdate()
    expect(result.current.currentColour).toBe(newColour)
    expect(result.current.currentShapeName).toBe(newShape)

    //edit shape
    act(() => {
      result.current.handleDrawShape()
    })
    console.log('edit', result.current)
    await waitForValueToChange(() => result.current.shapes)
    expect(result.current.shapes?.[0].type).toBe(newShape)
  })
})
