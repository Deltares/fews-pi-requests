import {PiWebserviceProvider} from '../../../src/piWebserviceProvider'

import 'cross-fetch/polyfill';
import fetchMock from "fetch-mock";
import {ReportsFilter, RunTaskFilter} from '../../../src/requestParameters';
import expectedResponse from '../mock/reports.json'

describe("reports", function () {
    afterAll(function () {
        fetchMock.restore();
    });

    it("gets called when done", async function () {
        fetchMock.get("https://mock.dev/fewswebservices/rest/fewspiservice/v1/reports?moduleInstanceIds=GenerateReport", {
            status: 200,
            body: JSON.stringify(expectedResponse)
        });

        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")

        const filter: ReportsFilter = {
            moduleInstanceIds: "GenerateReport"
        }
        const results = await provider.getReports(filter);
        expect(results).toStrictEqual(expectedResponse);
        expect("reports" in results).toBe(true);
        expect(results?.reports?.length).toBe(1);
        if (results?.reports?.length === 1) {
            const report = results.reports[0]
            expect(report?.moduleInstanceId).toBe("GenerateReport")
            expect(report?.mimeType).toBe("application/pdf")
            expect(report?.items?.length).toBe(1);
            if (report?.items.length === 1) {
                const reportDetails = report.items[0]
                expect(reportDetails?.moduleInstanceId).toBe("GenerateReport")
                expect(reportDetails?.taskRunId).toBe("taskRunId1")
                expect(reportDetails?.reportId).toBe(1)
                expect(reportDetails?.timeZero).toBe("1970-01-20T21:33:40Z")
                expect(reportDetails?.isCurrent).toBe(true)
            }
        }

    });
});
