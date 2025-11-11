import {PiWebserviceProvider} from '../../../src/piWebserviceProvider'

import fetchMock from "fetch-mock";
import {ReportFilter } from '../../../src/requestParameters';

import { describe, it, expect } from 'vitest';

const expectedResponse = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Test</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <style>
      p {
        font-size: 1em;
      }
    </style>
  </head>

  <body>
    <div>test</div>
  </body>
</html>
`

describe("report", function () {    it("gets called when done", async function () {
        const baseUrl = "https://mock.dev/fewswebservices/rest/fewspiservice/v1/report";
        const queryParams = "?moduleInstanceId=GenerateReport&taskRunId=taskRunId1&reportId=1";
        fetchMock.get(`${baseUrl}${queryParams}`, {
            status: 200,
            body: expectedResponse
        });

        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")

        const filter: ReportFilter = {
            moduleInstanceId: "GenerateReport",
            taskRunId: "taskRunId1",
            reportId: 1,
        }
        const result = await provider.getReport(filter);
        expect(result).toStrictEqual(expectedResponse);
    });
});
