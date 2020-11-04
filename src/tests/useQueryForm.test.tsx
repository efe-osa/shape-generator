import {renderHook, act} from '@testing-library/react-hooks'
import useQueryForm from '../hooks/useQueryForm'
import 'fake-indexeddb/auto'
import {cleanup} from '@testing-library/react'

afterEach(cleanup)

describe('test hook', () => {
  const {result, waitForNextUpdate} = renderHook(() => useQueryForm())

  it('validates query form', async () => {
    await act(() => {
      result.current.handleDrawShape()
    })
    await waitForNextUpdate()
    expect(result.current.error).toContain('Invalid')
  })
})
