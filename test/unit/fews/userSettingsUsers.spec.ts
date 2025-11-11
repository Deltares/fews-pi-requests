import { PiWebserviceProvider } from "../../../src";

import expectedResponse from "../mock/userSettingsUsers.json";
import fetchMock from "fetch-mock";

import { describe, it, expect } from 'vitest';

describe("usersettingsusers", function () {  it("it returns the user settings users", async function () {
    const baseUrl = "https://mock.dev/fewswebservices/rest/fewspiservice/v1/";
    fetchMock.get(`${baseUrl}usersettings/users?topicId=chart-collection`, {
      status: 200,
      body: expectedResponse,
    });

    const provider = new PiWebserviceProvider(
      "https://mock.dev/fewswebservices"
    );

    const results = await provider.getUserSettingsUsers({
      topicId: "chart-collection",
    });
    expect(results).toStrictEqual(expectedResponse);
    expect(results.userIds.length).toBe(1);
    expect(results.userIds[0]).toBe("viewer");
  });
});
