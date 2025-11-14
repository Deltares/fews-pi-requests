import { PiWebserviceProvider } from "../../../src/piWebserviceProvider";

import fetchMock from "fetch-mock";
import expectedColorsResponse from "../mock/colors.json";

import { describe, it, expect } from 'vitest';

describe("/colors", function () {  it("test colors", async function () {
    fetchMock.get(
      "https://mock.dev/fewswebservices/rest/fewspiservice/v1/colors/default",
      {
        status: 200,
        body: JSON.stringify(expectedColorsResponse),
      }
    );

    const provider = new PiWebserviceProvider(
      "https://mock.dev/fewswebservices"
    );
    const response = await provider.getColors();
    expect(response).toStrictEqual(expectedColorsResponse);
    expect(response.colors?.length).toBeGreaterThan(0);
    if (response.colors && response.colors.length > 0) {
      expect(response.colors[0].name).toBeDefined();
      expect(response.colors[0].color).toBeDefined();
    }
  });
});
