import { PiWebserviceProvider } from "../../../src/piWebserviceProvider";
import fetchMock from "fetch-mock";
import { LogDisplayLogsActionRequest } from "../../../src";

import { describe, it, expect } from 'vitest';

describe("postLogDisplaysAction", function () {  it("generates a valid postLogDisplaysAction request", async function () {
    const baseUrl =
      "https://mock.dev/fewswebservices/rest/fewspiservice/v1/logdisplays";

    fetchMock.post(`${baseUrl}/testLogDisplayId/action`, {
      status: 200,
      body: "Success",
    });

    const provider = new PiWebserviceProvider(
      "https://mock.dev/fewswebservices"
    );

    const request: LogDisplayLogsActionRequest = {
      logDisplayId: "testLogDisplayId",
      actionId: "testActionId",
      logMessage: "test",
      logLevel: "INFO", // Optional, can be omitted
      userId: "testUserId", // Optional, can be omitted
    };
    const response = await provider.postLogDisplaysAction(request);
    expect(typeof response === 'string').toBe(true);
  });
});
