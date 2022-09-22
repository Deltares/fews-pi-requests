import 'cross-fetch/polyfill';
import {PiWebserviceProvider, TaskRunsFilter} from "../../src";
import {TaskRunsResponse} from "../../src/response";
import {TopologyNodeResponse} from "../../src/response/topology/topologyNodeResponse";
import {DisplayGroupsFilter} from "../../src/requestParameters/DisplayGroupsFilter";
import {DisplayGroupsResponse} from "../../src/response/displaygroups/displayGroupsResponse";

const baseUrl = process.env.TEST_URL || "";


describe("pi webservice provider", function () {
    it("gets called when done", async function () {

        const provider = new PiWebserviceProvider(baseUrl);
        const filter = {} as DisplayGroupsFilter;
        filter.nodeId = "LB-Overzicht_BovenMaas";
        const res: DisplayGroupsResponse = await provider.getDisplayGroupsTimeSeriesInfo(filter);
        expect(res.results.length).toBeGreaterThan(0);

    })

    it("gets called when done", async function () {

        const provider = new PiWebserviceProvider(baseUrl);
        const res: TopologyNodeResponse = await provider.getTopologyNodes();
        expect(res.topologyNodes.length).toBeGreaterThan(0);
        const children = res.topologyNodes;
        expect(children.length).toBeGreaterThan(0)

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