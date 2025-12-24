import { PiWebserviceProvider } from "../../../src";
import { MicroFrontEndsFilter } from "../../../src/requestParameters/microFrontEndsFilter";

import expectedResponse from "../mock/microFrontEnds.json";
import fetchMock from "fetch-mock";

import { describe, it, expect } from 'vitest';

describe("microFrontEnds", function () {  it("gets called when done", async () => {
    fetchMock.get(
      "https://mock.dev/fewswebservices/rest/fewspiservice/v1/microfrontends",
      {
        status: 200,
        body: JSON.stringify(expectedResponse),
      }
    );

    const provider = new PiWebserviceProvider(
      "https://mock.dev/fewswebservices"
    );

    const microFrontEndsFilter: MicroFrontEndsFilter = {};

    const results = await provider.getMicroFrontEnds(microFrontEndsFilter);
    expect(results).toStrictEqual(expectedResponse);
    expect(results.microFrontEnds).toHaveLength(3);

    const microFrontEnd = results.microFrontEnds?.[0];
    expect(microFrontEnd?.id).toBe("mf-main-display");
    expect(microFrontEnd?.icon).toBe("mdi-toy-brick");
    expect(microFrontEnd?.remoteId).toBe("test-micro-frontend");
  });
});
