import { PiWebserviceProvider } from '../../../src/piWebserviceProvider'
import fetchMock from 'fetch-mock'
import expectedResponse from '../mock/postTopicMessage.json'

import { describe, it, expect } from 'vitest'
import { TopicsMessagesWithAttachments } from '../../../src'

describe('postTopicMessage', () => {
  it('generates a valid postTopicMessage request', async () => {
    const baseUrl =
      'https://mock.dev/fewswebservices/rest/fewspiservice/v1/topics/testTopicId/messages'

    fetchMock.post(baseUrl, {
      status: 200,
      body: expectedResponse,
    })

    const provider = new PiWebserviceProvider(
      'https://mock.dev/fewswebservices',
    )

    const body: TopicsMessagesWithAttachments = {
      subject: 'test subject',
    }
    const response = await provider.postTopicMessage('testTopicId', body)
    expect(response).toStrictEqual(expectedResponse)
  })
})
