import { PiWebserviceProvider } from '../../../src'

import expectedResponse from '../mock/messages.json'
import fetchMock from 'fetch-mock'

import { describe, it, expect } from 'vitest'

describe('messages', function () {
  it('it returns messages with correct types', async function () {
    fetchMock.get(
      'https://mock.dev/fewswebservices/rest/fewspiservice/v1/topics/testTopicId/messages/testMessageId',
      {
        status: 200,
        body: expectedResponse,
      },
    )

    const provider = new PiWebserviceProvider(
      'https://mock.dev/fewswebservices',
    )

    const results = await provider.getMessages({
      topicId: 'testTopicId',
      messageId: 'testMessageId',
    })
    expect(results).toStrictEqual(expectedResponse)
    expect('messages' in results).toBe(true)
    expect(results.allSuccess).toBe(true)
    expect(results.allFailed).toBe(false)
    expect(results.allArrived).toBe(true)
    expect(results?.messages?.length).toBe(2)
    if (results?.messages?.length === 2) {
      expect(results.messages[0].id).toBe('1152921542240432919')
      expect(results.messages[0].arrived).toBe('2026-06-04T12:23:29Z')
      expect(results.messages[0].status).toBe('success')
      expect(results.messages[0].statusDescription).toBe('sent')

      expect(results.messages[1].id).toBe('1152921542240432920')
      expect(results.messages[1].arrived).toBe('2026-06-04T12:23:29Z')
      expect(results.messages[1].status).toBe('success')
      expect(results.messages[1].statusDescription).toBe('sent')
    }
  })
})
