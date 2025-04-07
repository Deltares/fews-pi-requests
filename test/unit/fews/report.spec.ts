import {PiWebserviceProvider} from '../../../src/piWebserviceProvider'

import 'cross-fetch/polyfill';
import fetchMock from "fetch-mock";
import {ReportFilter } from '../../../src/requestParameters';

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

describe("report", function () {
    afterAll(function () {
        fetchMock.restore();
    });

    it("gets called when done", async function () {
        const baseUrl = "https://mock.dev/fewswebservices/rest/fewspiservice/v1/report";
        const queryParams = "?moduleInstanceIds=GenerateReport&taskRunId=taskRunId1&reportId=reportId1";
        fetchMock.get(`${baseUrl}${queryParams}`, {
            status: 200,
            body: JSON.stringify(expectedResponse)
        });

        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")

        const filter: ReportFilter = {
            moduleInstanceIds: "GenerateReport",
            taskRunId: "taskRunId1",
            reportId: "reportId1",
        }
        const result = await provider.getReport(filter);
        expect(result).toStrictEqual(expectedResponse);
    });
});
