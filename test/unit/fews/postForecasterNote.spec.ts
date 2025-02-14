import { PiWebserviceProvider } from "../../../src/piWebserviceProvider";
import "cross-fetch/polyfill";
import fetchMock from "fetch-mock";
import { ForecasterNoteRequest } from "../../../src";

describe("postForecasterNote", function () {
  afterAll(function () {
    fetchMock.restore();
  });

  it("generates a valid postForecasterNote request", async function () {
    const baseUrl =
      "https://mock.dev/fewswebservices/rest/fewspiservice/v1/forecasternotes";

    fetchMock.post(baseUrl, {
      status: 200,
      body: "Success",
    });

    const provider = new PiWebserviceProvider(
      "https://mock.dev/fewswebservices"
    );

    const body: ForecasterNoteRequest = {
      logMessage: "test",
      noteGroupId: "testGroupId",
    };
    const response = await provider.postForecasterNote(body);
    expect(typeof response === 'string').toBe(true);
  });
});
