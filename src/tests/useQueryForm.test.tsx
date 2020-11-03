import {cleanup} from '@testing-library/react'
import {renderHook} from '@testing-library/react-hooks'
import 'fake-indexeddb/auto'
import useQueryForm from '../hooks/useQueryForm'

afterEach(cleanup)

describe('test hook', () => {
  const {result, waitForNextUpdate} = renderHook(() => useQueryForm())

  it('validates form values', async () => {
    result.current.handleDrawShape()
    await waitForNextUpdate()
    expect(result.current.error).toContain('Invalid')
  })
})
