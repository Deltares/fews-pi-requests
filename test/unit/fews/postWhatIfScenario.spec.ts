import { PiWebserviceProvider } from "../../../src/piWebserviceProvider";
import expectedResponse from "../mock/whatifscenario.json";
import fetchMock from "fetch-mock";
import { PostWhatIfScenarioFilter } from "../../../src/requestParameters/postWhatIfScenarioFilter";

import { describe, it, expect } from 'vitest';

function hasValue(property: unknown): property is { value: unknown } {
  return typeof property === "object" && property !== null && "value" in property;
}

describe("postWhatIfScenario", function () {  it("generates a valid postWhatIfScenario request", async function () {
    const baseUrl =
      "https://mock.dev/fewswebservices/rest/fewspiservice/v1/whatifscenarios";
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
    const firstProperty = results.properties?.[0];
    expect(hasValue(firstProperty) ? firstProperty.value : undefined).toBe(0);
    expect(results.properties?.[1].id).toBe("MULTIPLY_SURGE");
    expect(results.properties?.[1].type).toBe("number");
    const secondProperty = results.properties?.[1];
    expect(hasValue(secondProperty) ? secondProperty.value : undefined).toBe(3);
  });
});
