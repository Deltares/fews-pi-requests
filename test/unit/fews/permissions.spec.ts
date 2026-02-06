import {PiWebserviceProvider} from '../../../src'

import expectedResponse from '../mock/permissions.json'
import fetchMock from "fetch-mock";

import { describe, it, expect } from 'vitest';

describe("taskRunStatus", function () {  it("it returns permissions with correct types", async function () {
    fetchMock.get(
      "https://mock.dev/fewswebservices/rest/fewspiservice/v1/permissions?documentFormat=PI_JSON",
      {
        status: 200,
        body: expectedResponse,
      }
    );

    const provider = new PiWebserviceProvider(
      "https://mock.dev/fewswebservices"
    );

    const results = await provider.getPermissions();
    expect(results).toStrictEqual(expectedResponse);
    expect("permissions" in results).toBe(true);
        expect(results?.permissions?.length).toBe(4);
        if (results?.permissions?.length === 4) {
            expect(results.permissions[0].id).toBe("AdminPermission");
            expect(results.permissions[0].assigned).toBe(false);
        }
  });
});
