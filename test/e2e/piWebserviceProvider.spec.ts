import 'cross-fetch/polyfill';
import {
    DocumentFormat,
    LocationsFilter,
    PiWebserviceProvider,
    TaskRunsFilter,
    TopologyActionsFilter
} from "../../src";

const baseUrl = process.env.TEST_URL || "";

describe("pi webservice provider", function () {
    it("get locations", async function () {
        const provider = new PiWebserviceProvider(baseUrl);
        const filter = {} as LocationsFilter;
        filter.documentFormat = DocumentFormat.PI_JSON;
        const res = await provider.getLocations(filter);
        expect(res.locations.length).toBeGreaterThan(0);
    })

    it("get timeseries with relative url", async function () {

        const provider = new PiWebserviceProvider(baseUrl);
        const res = await provider.getTimeSeriesWithRelativeUrl("rest/fewspiservice/v1/timeseries?timeSeriesType=EXTERNAL_HISTORICAL&locationIds=Lith_beneden&parameterIds=H.meting&documentFormat=PI_JSON");
        expect(res?.timeSeries?.length).toBeGreaterThan(0);
        for (let i = 0; res.timeSeries && i < res.timeSeries.length; i++){
            const timeSeries = res.timeSeries[i];
            expect(timeSeries?.header?.parameterId).toBe("H.meting")
            expect(timeSeries?.header?.locationId).toBe("Lith_beneden")
        }
    })
    it("get topology actions", async function () {

        const provider = new PiWebserviceProvider(baseUrl);
        const filter = {} as TopologyActionsFilter;
        filter.nodeId = "LB-Overzicht_BovenMaas";
        const res = await provider.getTopologyActions(filter);
        expect(res.results.length).toBeGreaterThan(0);

    })

    it("get topology nodes", async function () {

        const provider = new PiWebserviceProvider(baseUrl);
        const res = await provider.getTopologyNodes();
        expect(res.topologyNodes.length).toBeGreaterThan(0);
        const children = res.topologyNodes;
        expect(children.length).toBeGreaterThan(0)

    })

    it("get completed task runs", async function () {

        const provider = new PiWebserviceProvider(baseUrl);
        const taskRunFilter: TaskRunsFilter = {
            taskRunStatusIds: ["A"],
            onlyForecasts: false,
            documentFormat: DocumentFormat.PI_JSON,
            workflowId: "Plateau3_KGT",
            onlyCurrent: true
        };
        const res = await provider.getTaskRuns(taskRunFilter);
        expect(res.taskRuns.length).toBeGreaterThan(0);
        expect(res.taskRuns[0].current).toBe(true);
        for (const taskRun of res.taskRuns) {
            expect(taskRun.workflowId).toBe("Plateau3_KGT")
        }

    });
})