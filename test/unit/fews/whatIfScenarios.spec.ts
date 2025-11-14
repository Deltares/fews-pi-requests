import {
  DocumentFormat,
  PiWebserviceProvider,
  WhatIfScenariosFilter,
} from "../../../src";

import expectedResponse from "../mock/whatifscenarios.json";
import fetchMock from "fetch-mock";

import { describe, it, expect } from 'vitest';

describe("whatIfScenarios", function () {  it("gets called when done", async () => {
    fetchMock.get(
      "https://mock.dev/fewswebservices/rest/fewspiservice/v1/whatifscenarios?documentFormat=PI_JSON",
      {
        status: 200,
        body: JSON.stringify(expectedResponse),
      }
    );

    const provider = new PiWebserviceProvider(
      "https://mock.dev/fewswebservices"
    );

    const filter: WhatIfScenariosFilter = {
      documentFormat: DocumentFormat.PI_JSON,
    };

    const results = await provider.getWhatIfScenarios(filter);
    expect(results).toEqual(expectedResponse);
    expect(results.whatIfScenarioDescriptors.length).toBe(2);
    expect(results.whatIfScenarioDescriptors[0].id).toBe("id1");
    expect(results.whatIfScenarioDescriptors[0].name).toBe("triple_the_surge");
    expect(results.whatIfScenarioDescriptors[0].whatIfTemplateId).toBe(
      "whatif_surge"
    );
    expect(results.whatIfScenarioDescriptors[0].properties?.length).toBe(2);
    expect(results.whatIfScenarioDescriptors[0].properties?.[0].id).toBe(
      "ADD_SURGE"
    );
    expect(results.whatIfScenarioDescriptors[0].properties?.[0].type).toBe(
      "number"
    );
    expect(results.whatIfScenarioDescriptors[0].properties?.[0].value).toBe(
      0.0
    );
    expect(results.whatIfScenarioDescriptors[0].properties?.[1].id).toBe(
      "MULTIPLY_SURGE"
    );
    expect(results.whatIfScenarioDescriptors[0].properties?.[1].type).toBe(
      "number"
    );
    expect(results.whatIfScenarioDescriptors[0].properties?.[1].value).toBe(
      3.0
    );

    expect(results.whatIfScenarioDescriptors[1].id).toBe("id2");
    expect(results.whatIfScenarioDescriptors[1].name).toBe("offset_by_minus_1");
    expect(results.whatIfScenarioDescriptors[1].whatIfTemplateId).toBe(
      "whatif_surge"
    );
    expect(results.whatIfScenarioDescriptors[1].properties?.length).toBe(2);
    expect(results.whatIfScenarioDescriptors[1].properties?.[0].id).toBe(
      "ADD_SURGE"
    );
    expect(results.whatIfScenarioDescriptors[1].properties?.[0].type).toBe(
      "number"
    );
    expect(results.whatIfScenarioDescriptors[1].properties?.[0].value).toBe(
      -1.0
    );
    expect(results.whatIfScenarioDescriptors[1].properties?.[1].id).toBe(
      "MULTIPLY_SURGE"
    );
    expect(results.whatIfScenarioDescriptors[1].properties?.[1].type).toBe(
      "number"
    );
    expect(results.whatIfScenarioDescriptors[1].properties?.[1].value).toBe(
      1.0
    );
  });
});
