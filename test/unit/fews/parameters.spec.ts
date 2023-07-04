import {PiWebserviceProvider} from '../../../src/piWebserviceProvider'
import 'cross-fetch/polyfill';
import fetchMock from "fetch-mock";
import expectedResponse from '../mock/parameters.json'
import expectedGroupsOutput from '../mock/parameterGroups.json'
import {ParametersFilter} from "../../../src/requestParameters/parametersFilter";
import {DocumentFormat} from "../../../src/requestParameters/documentFormat";

describe("parameters", function () {
    afterAll(function () {
        fetchMock.restore();
    });

    it("parameters json response", async function () {
        fetchMock.get("https://mock.dev/fewswebservices/rest/fewspiservice/v1/parameters?documentFormat=PI_JSON", {
            status: 200,
            body: JSON.stringify(expectedResponse)
        });

        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")

        const filter: ParametersFilter = {
            documentFormat: DocumentFormat.PI_JSON,
        }
        const results = await provider.getParameters(filter);
        expect(results).toStrictEqual(expectedResponse);
        expect("timeSeriesParameters" in results).toBe(true);
        expect(results?.timeSeriesParameters?.length).toBe(5);
    });

    it("parametersGroups output", async function () {


        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")

        const filter: ParametersFilter = {
            documentFormat: DocumentFormat.PI_JSON,
        }
        const results = await provider.getParameters(filter, { type: 'parameterGroups'});
        expect(results).toStrictEqual(expectedGroupsOutput);
        expect("parameters" in results).toBe(true);
        expect(results?.parameters?.length).toBe(3);
    });
});
