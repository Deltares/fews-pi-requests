import 'cross-fetch/polyfill';
import {ImportStatusResponse, PiWebserviceProvider, TaskRunsFilter} from "../../src";
import {TaskRunsResponse} from "../../src/response";

const baseUrl = process.env.TEST_URL || "";


describe("pi webservice provider", function () {
    it("gets called when done", async function () {

        const provider = new PiWebserviceProvider(baseUrl);
        const res: ImportStatusResponse = await provider.getImportStatus();
        expect(res.importStatus.length).toBeGreaterThan(0);


    })

    it("gets called when done", async function () {

        const provider = new PiWebserviceProvider(baseUrl);
        const taskRunFilter: TaskRunsFilter = {
            taskRunStatusIds: ["A"],
            onlyForecasts: false,
            workflowId: "Radar_Nowcast_Det",
            onlyCurrent: true
        };
        const res: TaskRunsResponse = await provider.getTaskRuns(taskRunFilter);
        expect(res.taskRuns.length).toBeGreaterThan(0);
        expect(res.taskRuns[0].current).toBe(true);
        for (const taskRun of res.taskRuns) {
            expect(taskRun.workflowId).toBe("Radar_Nowcast_Det")
        }


    });
})