import {renderHook, act} from '@testing-library/react-hooks'
import useQueryForm from '../hooks/useQueryForm'
import {IDBService} from '../helpers/initCache'

const selectInput = (value: string, name?: string) => {
  return {
    target: {
      value,
      name,
    },
  } as any
}

describe('test hook', () => {
  const {result, waitForNextUpdate} = renderHook(() => useQueryForm())

  it('validates query form', () => {
    act(() => result.current.handleDrawShape())
    waitForNextUpdate()
    expect(result.current.error).toNotBe('')
  })

  it('saves shape attributes', () => {
    const db = IDBService()
    const circleAtrr = {
      radius: '20',
      type: 'circle',
      colour: '#000000',
    }
    result.current.handleSelectShape(selectInput(circleAtrr.type))
    result.current.handleInputChange(selectInput(circleAtrr.colour, 'colour'))
    result.current.handleInputChange(selectInput(circleAtrr.radius, 'radius'))
    act(() => {
      result.current.handleDrawShape()
      db.add(circleAtrr, 1)
    })

    // 'it updates shape attributes'

    let shape: any
    act(() => {
      result.current.handleEditShape(1)
    })

    result.current.handleSelectShape(selectInput(shape.type))
    result.current.handleInputChange(selectInput(shape.colour, 'colour'))
    result.current.handleInputChange(selectInput(shape.radius, 'radius'))
  })
})
