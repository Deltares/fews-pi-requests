import { PiWebserviceProvider } from "../../../src/piWebserviceProvider";
import expectedResponse from "../mock/forecasttimes.json";
import fetchMock from "fetch-mock";
import { ForecastTimesFilter } from "../../../src/requestParameters/forecastTimesFilter";

import { describe, it, expect } from 'vitest';

describe("forecastTimes", function () {  it("generates a valid forecastTimes request", async function () {
    const baseUrl =
      "https://mock.dev/fewswebservices/rest/fewspiservice/v1/workflows/forecasttimes";
    const queryParams = `workflowId=testWorkflowId&timeZero=2025-02-20T01%3A51%3A37.869Z`;

    const url = `${baseUrl}?${queryParams}`;

    fetchMock.get(url, {
      status: 200,
      body: expectedResponse,
    });

    const provider = new PiWebserviceProvider(
      "https://mock.dev/fewswebservices"
    );

    const filter: ForecastTimesFilter = {
      workflowId: "testWorkflowId",
      timeZero: "2025-02-20T01:51:37.869Z",
    };

    const results = await provider.getForecastTimes(filter);
    expect(results).toStrictEqual(expectedResponse);
    expect(results.selectedTimeZero).toBe("2025-02-20T01:50:00Z");
    expect(results.previousTimeZeros.length).toBe(1);
    expect(results.previousTimeZeros[0]).toBe("2025-02-20T01:40:00Z");
    expect(results.nextTimeZeros.length).toBe(1);
    expect(results.nextTimeZeros[0]).toBe("2025-02-20T02:00:00Z");
    expect(results.valid).toBe(false);
  });
});
