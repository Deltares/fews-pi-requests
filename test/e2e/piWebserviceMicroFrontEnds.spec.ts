import { type MicroFrontEndsFilter, PiWebserviceProvider } from '../../src'
import { describe, it, expect } from 'vitest'

const baseUrl = import.meta.env.VITE_DOCKER_URL || ''

describe('microFrontEnds', function () {
  it('get all microFrontEnds', async function () {
    const provider = new PiWebserviceProvider(baseUrl)
    const filter: MicroFrontEndsFilter = {}
    const res = await provider.getMicroFrontEnds(filter)
    expect(res?.microFrontEnds?.length).toBeGreaterThan(1)
  })

  it('get microFrontEnd by id', async function () {
    const provider = new PiWebserviceProvider(baseUrl)
    const filter: MicroFrontEndsFilter = {
      microFrontEndId: 'mf-main-display',
    }
    const res = await provider.getMicroFrontEnds(filter)
    expect(res?.microFrontEnds?.length).toEqual(1)
    expect(res?.microFrontEnds?.[0]?.id).toEqual('mf-main-display')
  })

  it('get microFrontEnd by invalid id', async function () {
    const provider = new PiWebserviceProvider(baseUrl)
    const invalidFilter: MicroFrontEndsFilter = {
      microFrontEndId: 'invalid_id',
    }
    await expect(
      provider.getMicroFrontEnds(invalidFilter),
    ).rejects.toBeInstanceOf(Error)
  })
})
