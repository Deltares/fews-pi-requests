import { PiWebserviceProvider } from "../../../src/piWebserviceProvider";
import expectedResponse from "../mock/whatifscenario.json";
import fetchMock from "fetch-mock";
import { PostWhatIfScenarioFilter } from "../../../src/requestParameters/postWhatIfScenarioFilter";

import { describe, it, expect } from 'vitest';

function isPropertyWithValue(property: unknown): property is { value: string | number | boolean } {
  return (
    property !== null &&
    typeof property === "object" &&
    "value" in property
  );
}

function expectPropertyValue(
  property: unknown,
  expected: string | number | boolean
): void {
  expect(property).toBeDefined();
  expect(isPropertyWithValue(property)).toBe(true);
  expect((property as { value: string | number | boolean }).value).toBe(expected);
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
    expectPropertyValue(results.properties?.[0], 0);
    expect(results.properties?.[1].id).toBe("MULTIPLY_SURGE");
    expect(results.properties?.[1].type).toBe("number");
    expectPropertyValue(results.properties?.[1], 3);
  });
});
