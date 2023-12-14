import 'cross-fetch/polyfill';
import {
    DocumentFormat,
    type LocationsFilter,
    PiWebserviceProvider,
    type TaskRunsFilter,
    type TimeSeriesResponse,
    type TopologyActionFilter
} from "../../src";

const baseUrl = process.env.TEST_URL || "";
const baseUrlWQPS = process.env.TEST_URL_WQPS || "";

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
        const filter = {} as TopologyActionFilter;
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

    it("get timeseries grid actions", async function () {
            
        const provider = new PiWebserviceProvider(baseUrlWQPS);
        const res = await provider.getTimeSeriesGridActions({
            layers: "oceanographic_water_level_cmems",
            x: 6460661.450297602,
            y: 1767631.7612143594,
            startTime: "2023-08-28T12:00:00.000Z",
            endTime: "2023-08-30T12:00:00.000Z",
            bbox: [1770893.0713109637,-410925.46406110685,8521811.409457732,5459438.308240431]
        });

        expect(res.results.length).toBeGreaterThan(0);        
    });

    it("timeseries edit", async function () {
        const provider = new PiWebserviceProvider(baseUrl);
        const timeSeries: TimeSeriesResponse = {
           "version":"1.32","timeZone":"0.0","timeSeries":[{"events":[{"date":"2023-12-12","time":"11:50:00","value":"15","flag":"1","flagSource":"MAN"}]}]
        };
        const editUrl = `${baseUrl}/rest/fewspiservice/v1/timeseries/edit?timeSeriesSetIndex=2958&locationId=Belfeld_boven`
        const res = await provider.postTimeSeriesEdit(editUrl, timeSeries);

        expect(res).toEqual('data was uploaded successfully')
    })
    
})