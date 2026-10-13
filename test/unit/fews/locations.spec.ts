import fetchMock from 'fetch-mock'
import { describe, expect, expectTypeOf, it } from 'vitest'
import { PiWebserviceProvider } from '../../../src/piWebserviceProvider'
import { DocumentFormat } from '../../../src/requestParameters/documentFormat'
import type {
  Location,
  LocationsResponse,
} from '../../../src/response/locations/locationsResponse'

describe('locations', () => {
  it('types iconLabel as an optional string', () => {
    expectTypeOf<Location['iconLabel']>().toEqualTypeOf<string | undefined>()
  })

  it.each([
    { locationId: 'delfzijl', iconLabel: 'Water level' },
    { locationId: 'delfzijl' },
  ] satisfies Location[])('preserves location fields: %j', async (location) => {
    const expected: LocationsResponse = {
      version: '1.25',
      geoDatum: 'WGS 1984',
      locations: [location],
    }

    fetchMock.get(
      'https://mock.dev/fewswebservices/rest/fewspiservice/v1/locations?documentFormat=PI_JSON',
      {
        status: 200,
        body: JSON.stringify(expected),
      },
    )

    const provider = new PiWebserviceProvider(
      'https://mock.dev/fewswebservices',
    )
    const result = await provider.getLocations({
      documentFormat: DocumentFormat.PI_JSON,
    })

    expect(result).toStrictEqual(expected)
    expect(result.locations[0].iconLabel).toBe(location.iconLabel)
  })
})
