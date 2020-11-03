import {renderHook, act} from '@testing-library/react-hooks'
import useQueryForm from '../hooks/useQueryForm'
import {selectInput, circleAttr} from './utils'
import 'fake-indexeddb/auto'
import {cleanup} from '@testing-library/react'

afterEach(cleanup)
jest.setTimeout(7000)
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

    await waitForValueToChange(() => result.current.radius)

    expect(result.current.currentShapeName).toBe(circleAttr.type)
    expect(result.current.currentColour).toBe(circleAttr.colour)
    expect(result.current.radius).toBe(circleAttr.radius)
    expect(result.current.shapes).not.toBe(0)
  })

  it('updates shape attributes', async () => {
    act(() => {
      result.current.handleEditShape(circleAttr)
    })
    await waitForValueToChange(() => result.current.activeId)

    expect(result.current.currentColour).toBe(circleAttr.colour)
    expect(result.current.currentShapeName).toBe(circleAttr.type)
    expect(result.current.radius).toBe(circleAttr.radius)
    expect(result.current.activeId).toBe(circleAttr.id)
  })
})
