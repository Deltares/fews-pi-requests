import { PiWebserviceProvider } from "../../../src";

import "cross-fetch/polyfill";
import expectedResponse from "../mock/dataAnalysisDisplays.json";
import fetchMock from "fetch-mock";

describe("dataAnalysisDisplays", function () {
  afterAll(function () {
    fetchMock.restore();
  });

  it("it returns dataAnalysisDisplays with correct types", async function () {
    fetchMock.get(
      "https://mock.dev/fewswebservices/rest/fewspiservice/v1/dataanalysisdisplays?dataAnalysisDisplayId=test_id",
      {
        status: 200,
        body: expectedResponse,
      }
    );

    const provider = new PiWebserviceProvider(
      "https://mock.dev/fewswebservices"
    );

    const results = await provider.getDataAnalysisDisplays({
      dataAnalysisDisplayId: "test_id",
    });
    expect(results).toStrictEqual(expectedResponse);
    expect("dataAnalysisDisplays" in results).toBe(true);
    expect(results.dataAnalysisDisplays?.length).toBe(1);
    expect(results.dataAnalysisDisplays?.[0].id).toBe("test_id");
    expect(results.dataAnalysisDisplays?.[0].name).toBe("Test Display");
    expect(results.dataAnalysisDisplays?.[0].relativeViewPeriod?.unit).toBe(
      "day"
    );
    expect(results.dataAnalysisDisplays?.[0].relativeViewPeriod?.start).toBe(
      "-30"
    );
    expect(results.dataAnalysisDisplays?.[0].relativeViewPeriod?.end).toBe("1");
    expect(results.dataAnalysisDisplays?.[0].filters?.length).toBe(1);
    expect(results.dataAnalysisDisplays?.[0].filters?.[0].id).toBe(
      "main_waterlevel"
    );
    expect(results.dataAnalysisDisplays?.[0].filters?.[0].name).toBe(
      "Main Water Level"
    );
    expect(
      results.dataAnalysisDisplays?.[0].selectionPanel?.locationSelection?.name
    ).toBe("Location");
    expect(
      results.dataAnalysisDisplays?.[0].selectionPanel?.parameterSelection?.name
    ).toBe("Parameter");
    expect(
      results.dataAnalysisDisplays?.[0].selectionPanel?.moduleInstanceSelection
        ?.name
    ).toBe("Model");
    expect(
      results.dataAnalysisDisplays?.[0].selectionPanel?.moduleInstanceSelection
        ?.enabled
    ).toBe(true);
    expect(
      results.dataAnalysisDisplays?.[0].selectionPanel
        ?.locationAttributeSelection?.enabled
    ).toBe(true);
    expect(
      results.dataAnalysisDisplays?.[0].selectionPanel
        ?.locationAttributeSelection?.attributes?.length
    ).toBe(1);
    expect(
      results.dataAnalysisDisplays?.[0].selectionPanel
        ?.locationAttributeSelection?.attributes?.[0].attributeId
    ).toBe("LOCATION_TYPE");
    expect(
      results.dataAnalysisDisplays?.[0].selectionPanel
        ?.locationAttributeSelection?.attributes?.[0].name
    ).toBe("Location type");
    expect(
      results.dataAnalysisDisplays?.[0].toolBoxes?.resampling?.enabled
    ).toBe(true);
    expect(
      results.dataAnalysisDisplays?.[0].toolBoxes?.correlation?.enabled
    ).toBe(true);
    expect(
      results.dataAnalysisDisplays?.[0].toolBoxes?.toolboxWorkflows?.length
    ).toBe(1);
    expect(
      results.dataAnalysisDisplays?.[0].toolBoxes?.toolboxWorkflows?.[0].id
    ).toBe("return_period");
    expect(
      results.dataAnalysisDisplays?.[0].toolBoxes?.toolboxWorkflows?.[0].name
    ).toBe("Return Period");
    expect(
      results.dataAnalysisDisplays?.[0].toolBoxes?.toolboxWorkflows?.[0]
        .workflowId
    ).toBe("TestWorkflowId");
    expect(
      results.dataAnalysisDisplays?.[0].toolBoxes?.toolboxWorkflows?.[0]
        .whatIfTemplateId
    ).toBe("TestWhatIfTemplateId");
    expect(
      results.dataAnalysisDisplays?.[0].toolBoxes?.toolboxWorkflows?.[0].results
        ?.filterId
    ).toBe("test_filter_id");
    expect(
      results.dataAnalysisDisplays?.[0].toolBoxes?.toolboxWorkflows?.[0].results
        ?.archiveProducts?.length
    ).toBe(1);
    expect(
      results.dataAnalysisDisplays?.[0].toolBoxes?.toolboxWorkflows?.[0].results
        ?.archiveProducts?.[0].id
    ).toBe("products_test");
    expect(
      results.dataAnalysisDisplays?.[0].toolBoxes?.toolboxWorkflows?.[0].results
        ?.archiveProducts?.[0].name
    ).toBe("products_test");
    expect(
      results.dataAnalysisDisplays?.[0].toolBoxes?.toolboxWorkflows?.[0].results
        ?.archiveProducts?.[0].areaId
    ).toBe("products");
    expect(
      results.dataAnalysisDisplays?.[0].toolBoxes?.toolboxWorkflows?.[0].results
        ?.archiveProducts?.[0].sourceId
    ).toBe("test");
    expect(
      results.dataAnalysisDisplays?.[0].toolBoxes?.toolboxWorkflows?.[0].results
        ?.archiveProducts?.[0].versionKeys?.length
    ).toBe(0);
    expect(
      results.dataAnalysisDisplays?.[0].toolBoxes?.toolboxWorkflows?.[0].results
        ?.archiveProducts?.[0].attributes?.length
    ).toBe(0);
    expect(results.dataAnalysisDisplays?.[0].archiveCoupling?.enabled).toBe(
      true
    );
    expect(
      results.dataAnalysisDisplays?.[0].archiveCoupling?.metaData?.properties
        ?.areaId
    ).toBe("test_area_id");
    expect(
      results.dataAnalysisDisplays?.[0].archiveCoupling?.metaData?.properties
        ?.sourceId
    ).toBe("test_source_id");
    expect(
      results.dataAnalysisDisplays?.[0].archiveCoupling?.metaData?.attributes
        ?.length
    ).toBe(2);
    expect(
      results.dataAnalysisDisplays?.[0].archiveCoupling?.metaData
        ?.attributes?.[0].test_key
    ).toBe("test_value");
    expect(
      results.dataAnalysisDisplays?.[0].archiveCoupling?.metaData
        ?.attributes?.[1].another_key
    ).toBe("another_value");
    expect(
      results.dataAnalysisDisplays?.[0].toolBoxes?.toolboxWorkflows?.[0].iconId
    ).toBe("mdi-clock");
  });
});
