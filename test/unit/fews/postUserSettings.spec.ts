import { PiWebserviceProvider } from "../../../src/piWebserviceProvider";
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
};

describe("postUserSettings", function () {  it("post a user settings body", async function () {
    const baseUrl =
      "https://mock.dev/fewswebservices/rest/fewspiservice/v1/usersettings?topicId=chart-collection&userId=test-user";

    fetchMock.post(baseUrl, {
      status: 200,
      body: "Success",
    });

    const provider = new PiWebserviceProvider(
      "https://mock.dev/fewswebservices"
    );

    const response = await provider.postUserSettings(
      {
        topicId: "chart-collection",
        userId: "test-user",
      },
      JSON.stringify(chartCollectionData)
    );
    expect(typeof response === "string").toBe(true);
    expect(response).toBe("Success");
  });
});
