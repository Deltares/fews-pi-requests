import { filterToParams } from '../../../src/utils/filterToParams'

import { describe, it, expect } from 'vitest';

describe('filterToParams', function () {
  it('serializes array values as repeated parameters by default', function () {
    const query = filterToParams({ taskRunIds: ['first', 'second'] })
    expect(query).toBe('?taskRunIds=first&taskRunIds=second')
  })

  it('serializes array values as comma-separated values when configured', function () {
    const query = filterToParams(
      { taskRunIds: ['first', 'second'] },
      'comma-separated-values'
    )

    expect(query).toBe('?taskRunIds=first%2Csecond')
  })

  it('ignores undefined values', function () {
    const query = filterToParams({ nodeId: 'test', taskRunIds: undefined })
    expect(query).toBe('?nodeId=test')
  })

  it('serializes bbox arrays and validates invalid bbox length', function () {
    const query = filterToParams({ bbox: [1, 2, 3, 4] })
    expect(query).toBe('?bbox=1%2C2%2C3%2C4')

    expect(() => filterToParams({ bbox: [1, 2, 3] })).toThrow(
      'bbox parameter must be an array of four numbers'
    )
  })
})
