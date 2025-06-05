import { PiWebserviceProvider } from "../../../src";

import "cross-fetch/polyfill";
import expectedResponse from "../mock/correlation.json";
import fetchMock from "fetch-mock";

describe("correlation", function () {
  afterAll(function () {
    fetchMock.restore();
  });

  it("it returns 2 correlation with correct types", async function () {
    fetchMock.get(
      "https://mock.dev/fewswebservices/rest/fewspiservice/v1/statistics/correlation?timeSeriesIdYaxis=ts1&timeSeriesIdXaxis=ts2&startTime=2023-01-01T00%3A00%3A00Z&endTime=2023-01-02T00%3A00%3A00Z&regressionEquation=exponential%20multiply",
      {
        status: 200,
        body: expectedResponse,
      }
    );

    const provider = new PiWebserviceProvider(
      "https://mock.dev/fewswebservices"
    );

    const results = await provider.getCorrelation({
      timeSeriesIdYaxis: "ts1",
      timeSeriesIdXaxis: "ts2",
      startTime: "2023-01-01T00:00:00Z",
      endTime: "2023-01-02T00:00:00Z",
      regressionEquation: "exponential multiply",
    });
    expect(results).toStrictEqual(expectedResponse);
    expect("equation" in results).toBe(true);
    expect(results.equation?.description).toBe(
      "Exponential Regression f(x) = 111.39822 *  exp( -0.00119 * x )"
    );
    expect(results.equation?.["R-squared"]).toBe(0.016868513);
    expect("title" in results).toBe(true);
    expect(results.title).toBe("H_obs LOC7 to H_obs LOC2");
    expect("xAxis" in results).toBe(true);
    expect(results.xAxis?.label).toBe("H_obs [m] LOC7");
    expect("yAxis" in results).toBe(true);
    expect(results.yAxis?.label).toBe("H_obs [m] LOC2");
    expect("values" in results).toBe(true);
    expect(results.values?.length).toBe(2);
    expect(results.values?.[0].time).toBe("2025-05-17T22:00:00+0000");
    expect(results.values?.[0].x).toBe(98.985);
    expect(results.values?.[0].y).toBe(99.09);
    expect(results.values?.[1].time).toBe("2025-05-17T22:05:00+0000");
    expect(results.values?.[1].x).toBe(98.953);
    expect(results.values?.[1].y).toBe(99.031);
    expect("fitPoints" in results).toBe(true);
    expect(results.fitPoints?.length).toBe(2);
    expect(results.fitPoints?.[0].x).toBe(98.806);
    expect(results.fitPoints?.[0].y).toBe(99.045);
    expect(results.fitPoints?.[1].x).toBe(98.823);
    expect(results.fitPoints?.[1].y).toBe(99.043);
  });
});
