
import 'cross-fetch/polyfill';
import {
    LogDisplayLogsFilter,
    PiWebserviceProvider,
    TopologyThresholdFilter
} from "../../src";
import {LogDisplaysFilter} from "../../lib/types";

const baseUrl = process.env.DOCKER_URL || "";


describe("log display logs", function () {

    it("get 1 system log", async function () {
        const provider = new PiWebserviceProvider(baseUrl);
        const filter: LogDisplayLogsFilter = {
            logDisplayId: 'admin_log',
            logType: 'system',
            level: 'INFO',
            maxCount: 1,
            startTime: '2025-03-01T08:55:36Z',
            endTime: '2025-03-30T21:59:59Z'
        }
        const res = await provider.getLogDisplayLogs(filter)
        expect(res?.logs?.length).toEqual(1);

    })

    it("get multiple system log", async function () {
        const provider = new PiWebserviceProvider(baseUrl);
        const filter: LogDisplayLogsFilter = {
            logDisplayId: 'admin_log',
            logType: 'system',
            level: 'INFO',
            startTime: '2025-03-01T08:55:36Z',
            endTime: '2025-03-30T21:59:59Z'
        }
        const res = await provider.getLogDisplayLogs(filter)
        expect(res?.logs?.length).toBeGreaterThan(1);

    })

})