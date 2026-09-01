import { PiWebserviceProvider } from '../../../src'

import fetchMock from 'fetch-mock'

import { describe, it, expect } from 'vitest'

describe('system time', function () {
  it('gets called when done', async function () {
    const expectedResponse = '2026-09-01T12:42:01Z'
    fetchMock.get(
      'https://mock.dev/fewswebservices/rest/fewspiservice/v1/systemtime',
      {
        status: 200,
        body: expectedResponse,
      },
    )

    const provider = new PiWebserviceProvider(
      'https://mock.dev/fewswebservices',
    )

    const results = await provider.getSystemTime()
    expect(results).toStrictEqual(expectedResponse)
  })
})
