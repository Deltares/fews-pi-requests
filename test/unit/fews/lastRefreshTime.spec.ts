import { PiWebserviceProvider } from '../../../src'

import fetchMock from 'fetch-mock'

import { describe, it, expect } from 'vitest'

describe('last refresh time', function () {
  it('gets called when done', async function () {
    const expectedResponse = '2026-09-03T13:52:32Z'
    fetchMock.get(
      'https://mock.dev/fewswebservices/rest/fewspiservice/v1/lastrefreshtime',
      {
        status: 200,
        body: expectedResponse,
      },
    )

    const provider = new PiWebserviceProvider(
      'https://mock.dev/fewswebservices',
    )

    const results = await provider.getLastRefreshTime()
    expect(results).toStrictEqual(expectedResponse)
  })
})
