import { PiWebserviceProvider } from "../../../src/piWebserviceProvider";
import "cross-fetch/polyfill";
import expectedResponse from "../mock/whatifscenario.json";
import fetchMock from "fetch-mock";
import { PostWhatIfScenarioFilter } from "../../../src/requestParameters/postWhatIfScenarioFilter";

describe("postWhatIfScenario", function () {
  afterAll(function () {
    fetchMock.restore();
  });

  it("generates a valid postWhatIfScenario request", async function () {
    const baseUrl =
      "https://mock.dev/fewswebservices/rest/fewspiservice/v1/whatifscenario";
    const queryParams = `whatIfTemplateId=testid&name=test&property(ADD_SURGE)=0.2&property(MULTIPLY_SURGE)=1.3`;

    const url = `${baseUrl}?${queryParams}`;

    fetchMock.post(url, {
      status: 200,
      body: expectedResponse,
    });

    const provider = new PiWebserviceProvider(
      "https://mock.dev/fewswebservices"
    );

    const properties = {
      ADD_SURGE: 0.2,
      MULTIPLY_SURGE: 1.3,
    };

    const filter: PostWhatIfScenarioFilter = {
      whatIfTemplateId: "testid",
      name: "test",
      properties,
    };
    const results = await provider.postWhatIfScenario(filter, "");
    expect(results).toStrictEqual(expectedResponse);
    expect(results.id).toBe("id1");
    expect(results.name).toBe("triple_the_surge");
    expect(results.whatIfTemplateId).toBe("whatif_surge");
    expect(results.properties?.length).toBe(2);
    expect(results.properties?.[0].id).toBe("ADD_SURGE");
    expect(results.properties?.[0].type).toBe("number");
    expect(results.properties?.[0].value).toBe(0);
    expect(results.properties?.[1].id).toBe("MULTIPLY_SURGE");
    expect(results.properties?.[1].type).toBe("number");
    expect(results.properties?.[1].value).toBe(3);
  });
});
