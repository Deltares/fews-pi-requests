import {
  DocumentFormat,
  PiWebserviceProvider,
  WhatIfTemplatesFilter,
} from "../../../src";

import expectedResponse from "../mock/whatiftemplates.json";
import "cross-fetch/polyfill";
import fetchMock from "fetch-mock";

describe("whatIfTemplates", function () {
  afterAll(() => {
    fetchMock.restore();
  });

  it("gets called when done", async () => {
    fetchMock.get(
      "https://mock.dev/fewswebservices/rest/fewspiservice/v1/whatiftemplates?documentFormat=PI_JSON",
      {
        status: 200,
        body: JSON.stringify(expectedResponse),
      }
    );

    const provider = new PiWebserviceProvider(
      "https://mock.dev/fewswebservices"
    );

    const whatIfTemplatesFilter: WhatIfTemplatesFilter = {
      documentFormat: DocumentFormat.PI_JSON,
    };

    const results = await provider.getWhatIfTemplates(whatIfTemplatesFilter);
    expect(results).toStrictEqual(expectedResponse);
    expect(results.whatIfTemplates.length).toBe(2);
    expect(results.whatIfTemplates[0].id).toBe("whatif_surge");
    expect(results.whatIfTemplates[0].name).toBe("WhatIf Properties");
    expect(results.whatIfTemplates[0].properties?.length).toBe(2);
    const numberProperty = results.whatIfTemplates[0].properties?.[0]
    expect(numberProperty?.id).toBe("ADD_SURGE");
    expect(numberProperty?.name).toBe("Add Surge");
    expect(numberProperty?.type).toBe("number");
    if (numberProperty?.type === "number") {
      expect(numberProperty.defaultValue).toBe(0.0);
      expect(numberProperty.maxValue).toBe(10.0);
    }
    expect(results.whatIfTemplates[1].id).toBe("test");
    expect(results.whatIfTemplates[1].name).toBe("test");
    expect(results.whatIfTemplates[1].properties?.length).toBe(6);
    const enumProperty = results.whatIfTemplates[1].properties?.[0]
    expect(enumProperty?.id).toBe("enumeration_id");
    expect(enumProperty?.name).toBe("enumeration_id");
    expect(enumProperty?.type).toBe("enumProperty");
    if (enumProperty?.type === "enumProperty") {
      expect(enumProperty.defaultValue).toBe("Lekker");
      expect(enumProperty.values.length).toBe(3);
      expect(enumProperty.values[0].code).toBe("Lekker");
      expect(enumProperty.values[0].label).toBe("Lekker");
    }
    const stringProperty = results.whatIfTemplates[1].properties?.[1]
    expect(stringProperty?.id).toBe("string_id");
    expect(stringProperty?.name).toBe("string_id");
    expect(stringProperty?.type).toBe("string");
    if (stringProperty?.type === "string") {
      expect(stringProperty?.defaultValue).toBe("");
    }

    const dateTimeProperty = results.whatIfTemplates[1].properties?.[2]
    expect(dateTimeProperty?.id).toBe("dateTime_id");
    expect(dateTimeProperty?.name).toBe("dateTime_id");
    expect(dateTimeProperty?.type).toBe("dateTime");
    if (dateTimeProperty?.type === "dateTime") {
      expect(dateTimeProperty?.defaultValue).toBe("2025-02-04T01:48:21Z");
    }

    const boolProperty = results.whatIfTemplates[1].properties?.[3]
    expect(boolProperty?.id).toBe("bool_id");
    expect(boolProperty?.name).toBe("bool_id");
    expect(boolProperty?.type).toBe("boolean");
    if (boolProperty?.type === "boolean") {
      expect(boolProperty?.defaultValue).toBe(false);
    }

    const mpEnumProperty = results.whatIfTemplates[1].properties?.[4]
    expect(mpEnumProperty?.id).toBe("mp_enumeration_id");
    expect(mpEnumProperty?.name).toBe("mp_enumeration_id");
    expect(mpEnumProperty?.type).toBeUndefined();

    const configFileProperty = results.whatIfTemplates[1].properties?.[5]
    expect(configFileProperty?.id).toBe("config_id");
    expect(configFileProperty?.name).toBe("config_id");
    expect(configFileProperty?.type).toBe("configFile");
    if (configFileProperty?.type === "configFile") {
      expect(configFileProperty?.configFileType).toBe("cold state");
      expect(configFileProperty?.default).toBeNull();
      expect(configFileProperty?.pattern).toBe("Cold*");
      expect(configFileProperty?.hidePattern).toBe(false);
    }
  });
});
