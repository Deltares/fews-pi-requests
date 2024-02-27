import {PiWebserviceProvider} from '../../../src/piWebserviceProvider.js'

import expectedResponse from '../mock/webOcConfiguration.json'
import expectedPublicResponse from '../mock/webOcPublicConfiguration.json'
import 'cross-fetch/polyfill';
import fetchMock from "fetch-mock";
import {
    WebOcTopologyDisplayConfig,
    WebOcSpatialDisplayConfig,
    WebOcSchematicStatusDisplayConfig,
    WebOcSystemMonitorConfig,
    WebOcDataDownloadDisplayConfig
} from "../../../src";
import {
    isDataDownloadDisplay,
    isSchematicStatusDisplay,
    isSpatialDisplay, isSystemMonitor,
    isTopologyDisplay
} from "../../../src/utils/webOcCompontentsTypeGuards";

describe("webOcConfig", function () {
    afterAll(function () {
        fetchMock.restore();
    });

    it("tests fetch Web OC config", async function () {
        fetchMock.get("https://mock.dev/fewswebservices/rest/fewspiservice/v1/weboc/config?documentFormat=PI_JSON", {
            status: 200,
            body: JSON.stringify(expectedResponse)
        });

        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")
        const results = await provider.getWebOcConfiguration();
        expect(results).toStrictEqual(expectedResponse);
        expect(results.general.title).toBe('UAE Meteorological and Oceanographic Modelling and Prediction System');
        expect(isTopologyDisplay(results.components[0])).toBeTruthy();
        expect(isSpatialDisplay(results.components[1])).toBeTruthy();
        expect(isSystemMonitor(results.components[2])).toBeTruthy();
        expect(isSchematicStatusDisplay(results.components[3])).toBeTruthy();
        if (isTopologyDisplay(results.components[0])) {
            const topologyDisplay = results.components[0] as WebOcTopologyDisplayConfig;
            expect(topologyDisplay.id).toBe("topologyDisplay")
            expect(topologyDisplay.title).toBe("Topology Display")
            if (topologyDisplay.defaultPath) {
                expect(topologyDisplay.defaultPath.nodeId).toBe("test")
            }
        }
        if (isSpatialDisplay(results.components[1])) {
            const spatialDisplay = results.components[1] as WebOcSpatialDisplayConfig;
            if (spatialDisplay.defaultPath) {
                expect(spatialDisplay.defaultPath.gridPlotId).toBe("test")
            }
        }
        if (isSystemMonitor(results.components[2])) {
            const systemMonitor = results.components[2] as WebOcSystemMonitorConfig;
            expect(systemMonitor.title).toBe("System Monitor Title")
        }
        if (isSchematicStatusDisplay(results.components[3])) {
            const ssd = results.components[3] as WebOcSchematicStatusDisplayConfig;
            expect(ssd.id).toBe("schematicStatusDisplay")
            expect(ssd.title).toBe("SSD Title")
            if (ssd.defaultPath) {
                expect(ssd.defaultPath.groupId).toBe("panelGroup");
                expect(ssd.defaultPath.panelId).toBe("panelName");
            }
        }
        if (isDataDownloadDisplay(results.components[4])) {
            const ddd = results.components[4] as WebOcDataDownloadDisplayConfig;
            expect(ddd.id).toBe("dataDownloadDisplay")
            expect(ddd.title).toBe("My Data Download")
            expect(ddd.showInNavigationMenu).toBeTruthy()
        }
        expect(results.components.length).toBe(5)
    });

    it("tests fetch Web OC Public config", async function () {
        fetchMock.get("https://mock.dev/fewswebservices/rest/fewspiservice/v1/weboc/config/public?documentFormat=PI_JSON", {
            status: 200,
            body: JSON.stringify(expectedPublicResponse)
        });
        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")
        const results = await provider.getWebOcPublicConfiguration();
        expect(results).toStrictEqual(expectedPublicResponse);
        expect(results.general.title).toBe('my public title');
        expect(results.components).toBeUndefined();
    })

    it("get static resource", async function () {
        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")
        const results = await provider.resourcesStaticUrl('css/style.css')
        expect(results.toString()).toStrictEqual("https://mock.dev/fewswebservices/rest/fewspiservice/v1/resources/static/css/style.css");

        const resultsAbsolute = await provider.resourcesStaticUrl('https://mydomain.com/css/style.css')
        expect(resultsAbsolute.toString()).toStrictEqual("https://mydomain.com/css/style.css");

        const resultsHttpsPath = await provider.resourcesStaticUrl('https/css/style.css')
        expect(resultsHttpsPath.toString()).toStrictEqual("https://mock.dev/fewswebservices/rest/fewspiservice/v1/resources/static/https/css/style.css");

        const resultsHttpPath = await provider.resourcesStaticUrl('http/css/style.css')
        expect(resultsHttpPath.toString()).toStrictEqual("https://mock.dev/fewswebservices/rest/fewspiservice/v1/resources/static/http/css/style.css");

    })
});
