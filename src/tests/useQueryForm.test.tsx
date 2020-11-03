import {renderHook, act} from '@testing-library/react-hooks'
import useQueryForm from '../hooks/useQueryForm'
import {selectInput, circleAttr} from './utils'
import 'fake-indexeddb/auto'
import {cleanup} from '@testing-library/react'

afterEach(cleanup)

describe('test hook', () => {
  const {result, waitForNextUpdate} = renderHook(() => useQueryForm())

  it('validates form values', async () => {
    act(() => {
      result.current.handleDrawShape()
    })
    await waitForNextUpdate()
    expect(result.current.error).toContain('Invalid')
  })
})
