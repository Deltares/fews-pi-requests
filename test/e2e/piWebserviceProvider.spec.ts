import 'cross-fetch/polyfill';
import {
    DocumentFormat, type filterActionsFilter,
    type LocationsFilter,
    PiWebserviceProvider,
    type TaskRunsFilter
} from "../../src";

const baseUrl = process.env.DOCKER_URL || "";
const fewsVersion: number = process.env.FEWS_VERSION ? parseInt(process.env.FEWS_VERSION, 10) : 999999;

describe("pi webservice provider", function () {
    it("get locations", async function () {
        const provider = new PiWebserviceProvider(baseUrl);
        const filter = {} as LocationsFilter;
        filter.documentFormat = DocumentFormat.PI_JSON;
        const res = await provider.getLocations(filter);
        expect(res.locations.length).toBeGreaterThan(0);
    })

    it("get timeseries with relative url", async function () {
        // http://localhost:8080/FewsWebServices/rest/fewspiservice/v1/filters/actions?locationIds=Umgeni_Mouth_level&filterId=River%20Stations&useDisplayUnits=true&convertDatum=true

        const filter = {} as filterActionsFilter;
        filter.locationIds = "Umgeni_Mouth_level";
        filter.filterId = "River Stations";
        const provider = new PiWebserviceProvider(baseUrl);
        const filterActions = await provider.getFilterActions(filter);
        const request = filterActions.results[0].requests[0].request;

        const res = await provider.getTimeSeriesWithRelativeUrl(request);
        expect(res?.timeSeries?.length).toBeGreaterThan(0);
        for (let i = 0; res.timeSeries && i < res.timeSeries.length; i++){
            const timeSeries = res.timeSeries[i];
            expect(timeSeries?.header?.parameterId).toBe("H.obs")
            expect(timeSeries?.header?.locationId).toBe("Umgeni_Mouth_level")
        }
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
            workflowId: "SFINCSPalmiet",
            onlyCurrent: true
        };
        const res = await provider.getTaskRuns(taskRunFilter);
        expect(res.taskRuns.length).toBeGreaterThan(0);
        expect(res.taskRuns[0].current).toBe(true);
        for (const taskRun of res.taskRuns) {
            expect(taskRun.workflowId).toBe("SFINCSPalmiet")
        }

    });

    it("get timeseries grid actions", async function () {
        // ?layers=saws1&x=3497547.0812338623&y=-3498537.741543421&startTime=2025-03-13T18%3A00%3A00Z&endTime=2025-03-15T06%3A00%3A00Z&
        //
        // bbox=3485991.6981145153 -3510098.363325539 3509102.4643532103 -3486987.5749842175&documentFormat=PI_JSON&useDisplayUnits=true&thinning=135000
        const provider = new PiWebserviceProvider(baseUrl);
        const res = await provider.getTimeSeriesGridActions({
            layers: "saws1",
            x: 3497547.081233862,
            y: -3498537.741543421,
            startTime: "2025-03-13T18:00:00Z",
            endTime: "2025-03-15T18:00:00Z",
            bbox: [3485991.6981145153,-3510098.363325539,3509102.4643532103,-3486987.5749842175],
        });
        expect(res.results.length).toBeGreaterThan(0);        
    });
    // todo, add once an editable timeseries is available
    // it("timeseries edit", async function () {
    //     const provider = new PiWebserviceProvider(baseUrl);
    //     const timeSeries: TimeSeriesResponse = {
    //        "version":"1.32","timeZone":"0.0","timeSeries":[{"events":[{"date":"2023-12-12","time":"11:50:00","value":"15","flag":"1","flagSource":"MAN"}]}]
    //     };
    //     const editUrl = `${baseUrl}/rest/fewspiservice/v1/timeseries/edit?timeSeriesSetIndex=2958&locationId=Belfeld_boven`
    //     await provider.postTimeSeriesEdit(editUrl, timeSeries);
    //     // improvement: e2e testing depends on the state of the database using the timeSeriesSetIndex.
    // })
    
})