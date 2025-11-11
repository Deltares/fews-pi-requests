import { PiWebserviceProvider } from "../../../src";

import fetchMock from "fetch-mock";

import { describe, it, expect } from 'vitest';

const chartCollectionData = {
  "chart-collection": {
    charts: [
      {
        id: "chart1",
        name: "Chart 1",
        settings: {
          type: "line",
          color: "blue",
        },
      },
      {
        id: "chart2",
        name: "Chart 2",
        settings: {
          type: "bar",
          color: "red",
        },
      },
    ],
  },
}

type ChartCollectionData = typeof chartCollectionData;

describe("usersettings", function () {  it("it returns the user settings", async function () {
    const baseUrl = "https://mock.dev/fewswebservices/rest/fewspiservice/v1/";
    fetchMock.get(`${baseUrl}usersettings?topicId=chart-collection&userId=test-user`, {
      status: 200,
      body: chartCollectionData,
    });

    const provider = new PiWebserviceProvider(
      "https://mock.dev/fewswebservices"
    );

    const results = await provider.getUserSettings<ChartCollectionData>({
      topicId: "chart-collection",
      userId: "test-user",
    });
    expect(results).toStrictEqual(chartCollectionData);
    expect(results["chart-collection"].charts.length).toBe(2);
    expect(results["chart-collection"].charts[0].id).toBe("chart1");
    expect(results["chart-collection"].charts[1].settings.color).toBe("red");
    expect(results["chart-collection"].charts[1].settings.type).toBe("bar");
  });
});
