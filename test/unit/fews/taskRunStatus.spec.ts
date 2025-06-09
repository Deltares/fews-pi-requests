import { DocumentFormat, PiWebserviceProvider } from "../../../src";

import "cross-fetch/polyfill";
import expectedResponse from "../mock/taskRunStatus.json";
import fetchMock from "fetch-mock";

describe("taskRunStatus", function () {
  afterAll(function () {
    fetchMock.restore();
  });

  it("it returns taskRunStatus with correct types", async function () {
    fetchMock.get(
      "https://mock.dev/fewswebservices/rest/fewspiservice/v1/taskrunstatus?taskId=test_id&documentFormat=PI_JSON",
      {
        status: 200,
        body: expectedResponse,
      }
    );

    const provider = new PiWebserviceProvider(
      "https://mock.dev/fewswebservices"
    );

    const results = await provider.getTaskRunStatus({
      taskId: "test_id",
      documentFormat: DocumentFormat.PI_JSON,
    });
    expect(results).toStrictEqual(expectedResponse);
    expect(results.version).toBe("1.34");
    expect(results.code).toBe("F");
    expect(results.description).toBe("Failed");
    expect(results.taskRunId).toBe("mc00:000174997");
  });
});
