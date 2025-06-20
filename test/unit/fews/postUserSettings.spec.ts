import { PiWebserviceProvider } from "../../../src/piWebserviceProvider";
import "cross-fetch/polyfill";
import fetchMock from "fetch-mock";

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

describe("postUserSettings", function () {
  afterAll(function () {
    fetchMock.restore();
  });

  it("post a user settings body", async function () {
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
      chartCollectionData
    );
    expect(typeof response === "string").toBe(true);
    expect(response).toBe("Success");
  });
});
