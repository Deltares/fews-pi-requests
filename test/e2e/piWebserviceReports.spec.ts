
import 'cross-fetch/polyfill';
import {
    ReportsFilter,
    ReportFilter,
    PiWebserviceProvider
} from "../../src";

const baseUrl = process.env.DOCKER_URL || "";

describe("reports", function () {
    it("list all reports and get an actual report", async function () {
        const provider = new PiWebserviceProvider(baseUrl);
        const filter: ReportsFilter = {
            moduleInstanceIds: 'ReportRainfallReturnPeriodTable'
        }
        const res = await provider.getReports(filter)
        expect(res?.reports?.length).toBeGreaterThan(0);
        const report = res.reports?.[0];
        expect(report?.mimeType).toEqual('text/html');
        if (report && report.items && report.items.length > 0) {
            const reportItem = report.items[0];
            const reportFilter: ReportFilter = {
                reportId: reportItem.reportId,
                taskRunId: reportItem.taskRunId,
                moduleInstanceId: reportItem.moduleInstanceId
            }

            const reportResponse = await provider.getReport(reportFilter);
            expect(typeof reportResponse).toBe('string');
            expect(reportResponse.length).toBeGreaterThan(0)
        } else {
            fail("No report found");
        }
    })
})