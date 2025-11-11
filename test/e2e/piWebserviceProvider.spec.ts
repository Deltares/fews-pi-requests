import {
    DocumentFormat, type filterActionsFilter,
    type LocationsFilter,
    PiWebserviceProvider,
    TimeSeriesResponse,
    type TaskRunsFilter
} from "../../src";
import { describe, it, expect } from 'vitest';

const baseUrl = import.meta.env.VITE_DOCKER_URL || "";

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

    it("timeseries edit", async function () {
        const filter = {} as filterActionsFilter;
        filter.locationIds = "Umgeni_Mouth_level";
        filter.filterId = "River Stations";
        const provider = new PiWebserviceProvider(baseUrl);
        const filterActions = await provider.getFilterActions(filter);
        const request = filterActions.results[0].requests[0].request;
        const editRequest = filterActions.results[0].requests[0].editRequest;
        const res = await provider.getTimeSeriesWithRelativeUrl(request);
        expect(res?.timeSeries?.length).toBeGreaterThan(0);
        if (res?.timeSeries && res.timeSeries.length > 0) {
            const timeSeriesResult = res?.timeSeries[0];
            expect(timeSeriesResult?.header?.parameterId).toBe("H.obs")
            expect(timeSeriesResult?.header?.locationId).toBe("Umgeni_Mouth_level")
            if (timeSeriesResult.events && timeSeriesResult.events.length > 0) {
                const event = timeSeriesResult.events[0];
                expect(event.date).toBeDefined();
                expect(event.time).toBeDefined();
                expect(event.value).toBeDefined();
                expect(event.flag).toBeDefined();
                const newValue = '1234567';
                event.flag = '2';
                const newEvent = {
                    date: event.date,
                    time: event.time,
                    value: newValue,
                    flag: event.flag,
                    flagSource: event.flagSource
                }
                const newTimeSeries: TimeSeriesResponse = {
                   "version":"1.32","timeZone":"0.0","timeSeries":[{"events":[ newEvent ]}],
                };
                const editUrl = `${baseUrl}` + editRequest;
                await provider.postTimeSeriesEdit(editUrl, newTimeSeries);
                const updatedResp = await provider.getTimeSeriesWithRelativeUrl(request);
                const newValueEvent = updatedResp?.timeSeries?.[0]?.events?.[0];
                if (newValueEvent) {
                    expect(newValueEvent.value).toBe(newValue);
                    expect(newValueEvent.flag).toBe(event.flag);
                } else {
                    throw new Error("No events found in time series for Umgeni_Mouth_level");
                }

            } else {
                throw new Error("No events found in time series for Umgeni_Mouth_level");
            }
        } else {
            throw new Error("No time series found for Umgeni_Mouth_level");
        }
    })
    
})