import { DocumentFormat, PiWebserviceProvider, WorkflowsFilter } from "../../../src";

import expectedResponse from "../mock/workflows.json";
import "cross-fetch/polyfill";
import fetchMock from "fetch-mock";

describe("workflows", function () {
  afterAll(() => {
    fetchMock.restore();
  });

  it("gets called when done", async () => {
    fetchMock.get(
      "https://mock.dev/fewswebservices/rest/fewspiservice/v1/workflows?documentFormat=PI_JSON",
      {
        status: 200,
        body: JSON.stringify(expectedResponse),
      }
    );

    const provider = new PiWebserviceProvider(
      "https://mock.dev/fewswebservices"
    );

    const workflowsFilter: WorkflowsFilter = {
        documentFormat: DocumentFormat.PI_JSON,
    }

    const results = await provider.getWorkflows(workflowsFilter);
    expect(results).toStrictEqual(expectedResponse);
    expect(results.workflows.length).toBe(2);
    expect(results.workflows[0].id).toBe("ImportHistorical");
    expect(results.workflows[0].name).toBe("Import Historical Data");
    expect(results.workflows[0].description).toBe("");
    expect(results.workflows[1].id).toBe("ImportTEST");
    expect(results.workflows[1].name).toBe("Import TEST");
    expect(results.workflows[1].description).toBe("Import TEST");
  });
});
