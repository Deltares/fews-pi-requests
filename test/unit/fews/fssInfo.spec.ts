import { PiWebserviceProvider } from "../../../src/piWebserviceProvider";
import "cross-fetch/polyfill";
import expectedResponse from "../mock/fssinfo.json";
import fetchMock from "fetch-mock";
import { FssInfoFilter } from "../../../src/requestParameters/fssInfoFilter";

describe("fssInfo", function () {
  afterAll(function () {
    fetchMock.restore();
  });

  it("generates a valid fssInfo request", async function () {
    const baseUrl =
      "https://mock.dev/fewswebservices/rest/fewspiservice/v1/workflows/fssinfo";
    const queryParams = `workflowId=testWorkflowId`;

    const url = `${baseUrl}?${queryParams}`;

    fetchMock.get(url, {
      status: 200,
      body: expectedResponse,
    });

    const provider = new PiWebserviceProvider(
      "https://mock.dev/fewswebservices"
    );

    const filter: FssInfoFilter = {
      workflowId: "testWorkflowId",
    };

    const results = await provider.getFssInfo(filter);
    expect(results).toStrictEqual(expectedResponse);
    expect(results.workflowFssInfo.forecastingShellCount).toBe(1);
    expect(results.workflowFssInfo.fssGroups.length).toBe(1);
    expect(results.workflowFssInfo.fssGroups[0].id).toBe("windows_1");
    expect(results.workflowFssInfo.fssGroups[0].name).toBe("windows_1");
    expect(results.workflowFssInfo.fssGroups[0].forecastingShells.length).toBe(
      1
    );
    expect(results.workflowFssInfo.fssGroups[0].forecastingShells[0].id).toBe(
      161
    );
  });
});
