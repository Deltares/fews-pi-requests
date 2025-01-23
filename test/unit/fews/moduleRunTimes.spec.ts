import { DocumentFormat, PiWebserviceProvider, ModuleRuntimesFilter } from "../../../src";

import expectedResponse from "../mock/moduleRunTimes.json";
import "cross-fetch/polyfill";
import fetchMock from "fetch-mock";

describe("moduleRunTimes", function () {
  afterAll(() => {
    fetchMock.restore();
  });

  it("gets called when done", async () => {
    fetchMock.get(
      "https://mock.dev/fewswebservices/rest/fewspiservice/v1/moduleruntimes?documentFormat=PI_JSON",
      {
        status: 200,
        body: JSON.stringify(expectedResponse),
      }
    );

    const provider = new PiWebserviceProvider(
      "https://mock.dev/fewswebservices"
    );

    const filter: ModuleRuntimesFilter = {
        documentFormat: DocumentFormat.PI_JSON,
    }

    const results = await provider.getModuleRunTimes(filter);
    expect(results).toStrictEqual(expectedResponse);
    expect(results.moduleRunTimes.length).toBe(2);
    expect(results.moduleRunTimes[0].workflowId).toBe("testWorkflowId1");
    expect(results.moduleRunTimes[0].moduleInstanceId).toBe("testModuleInstanceId1");
    expect(results.moduleRunTimes[0].mcId).toBe("testId1");
    expect(results.moduleRunTimes[0].expectedStartTime).toBe(1737640822000);
    expect(results.moduleRunTimes[0].expectedCompletionTime).toBe(1737640822000);
    expect(results.moduleRunTimes[0].expectedPendingDuration).toBe(21568);
    expect(results.moduleRunTimes[0].expectedRunningDuration).toBe(41);
    expect(results.moduleRunTimes[1].workflowId).toBe("testWorkflowId2");
    expect(results.moduleRunTimes[1].moduleInstanceId).toBe("testModuleInstanceId2");
    expect(results.moduleRunTimes[1].mcId).toBe("testId2");
    expect(results.moduleRunTimes[1].expectedStartTime).toBe(1737640822000);
    expect(results.moduleRunTimes[1].expectedCompletionTime).toBe(1737641175000);
    expect(results.moduleRunTimes[1].expectedPendingDuration).toBe(21610);
    expect(results.moduleRunTimes[1].expectedRunningDuration).toBe(353755);
  });
});
