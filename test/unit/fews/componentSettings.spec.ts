import { PiWebserviceProvider, ComponentSettingsFilter } from "../../../src";

import expectedResponse from "../mock/componentSettings.json";
import "cross-fetch/polyfill";
import fetchMock from "fetch-mock";

describe("componentSettings", function () {
  afterAll(() => {
    fetchMock.restore();
  });

  it("gets called when done", async () => {
    const baseUrl =
      "https://mock.dev/fewswebservices/rest/fewspiservice/v1/weboc/config/componentsettings";
    const queryParams = `componentSettingsId=componentA`;

    const url = `${baseUrl}?${queryParams}`;

    fetchMock.get(url, {
      status: 200,
      body: expectedResponse,
    });

    const provider = new PiWebserviceProvider(
      "https://mock.dev/fewswebservices"
    );

    const filter: ComponentSettingsFilter = {
      componentSettingsId: "componentA",
    };

    const results = await provider.getComponentSettings(filter);
    expect(results).toStrictEqual(expectedResponse);
    expect(results.webOCComponentSettings?.id).toBe("componentA");
    expect(results.webOCComponentSettings?.map?.wmsLayer?.show).toBe(true);
    expect(results.webOCComponentSettings?.map?.wmsLayer?.autoPlay).toBe(true);
    expect(results.webOCComponentSettings?.map?.wmsLayer?.animateVectors).toBe(
      true
    );
    expect(
      results.webOCComponentSettings?.map?.wmsLayer?.doubleClickAction
    ).toBe(false);
    expect(results.webOCComponentSettings?.map?.locationsLayer?.show).toBe(
      true
    );
    expect(
      results.webOCComponentSettings?.map?.locationsLayer?.locationNames
    ).toBe(true);
    expect(
      results.webOCComponentSettings?.map?.locationsLayer?.singleClickAction
    ).toBe(false);
    expect(
      results.webOCComponentSettings?.map?.locationsLayer?.locationSearchEnabled
    ).toBe(true);
    expect(results.webOCComponentSettings?.map?.overlays?.length).toBe(2);
    expect(
      results.webOCComponentSettings?.map?.overlays?.[0].id
    ).toBe("control_subcatchments");
    expect(
      results.webOCComponentSettings?.map?.overlays?.[0].visible
    ).toBe(true);
    expect(
      results.webOCComponentSettings?.map?.overlays?.[0].name
    ).toBe("Sub-catchments");
    expect(
      results.webOCComponentSettings?.map?.overlays?.[0].locationSetId
    ).toBe("control_subcatchments");
    expect(
      results.webOCComponentSettings?.map?.overlays?.[0].type
    ).toBe("line");
    expect(
      results.webOCComponentSettings?.map?.overlays?.[0].paint?.fillAntiAlias
    ).toBe(true);
    expect(
      results.webOCComponentSettings?.map?.overlays?.[0].paint?.fillOpacity
    ).toBe(0.2);
    expect(
      results.webOCComponentSettings?.map?.overlays?.[0].paint?.fillColor
    ).toBe("black");
    expect(
      results.webOCComponentSettings?.map?.overlays?.[0].paint?.fillOutlineColor
    ).toBe("black");
    expect(
      results.webOCComponentSettings?.map?.overlays?.[1].id
    ).toBe("control_branches");
    expect(
      results.webOCComponentSettings?.map?.overlays?.[1].visible
    ).toBe(true);
    expect(
      results.webOCComponentSettings?.map?.overlays?.[1].name
    ).toBe("Drain Network");
    expect(
      results.webOCComponentSettings?.map?.overlays?.[1].locationSetId
    ).toBe("control_branches");
    expect(
      results.webOCComponentSettings?.map?.overlays?.[1].type
    ).toBe("line");
    expect(
      results.webOCComponentSettings?.map?.overlays?.[1].paint?.lineColor
    ).toBe("#3944BC");
    expect(
      results.webOCComponentSettings?.charts?.general?.startPanel
    ).toBe("metaDataPanel");
    expect(
      results.webOCComponentSettings?.charts?.general?.toolBar
    ).toBe("false");
    expect(
      results.webOCComponentSettings?.charts?.general?.locationNames
    ).toBe(false);
    expect(
      results.webOCComponentSettings?.charts?.actions?.panelPlacement
        ?.defaultPlacement
    ).toBe("right");
    expect(
      results.webOCComponentSettings?.charts?.actions?.panelPlacement
        ?.allowedPlacement?.length
    ).toBe(5);
    expect(
      results.webOCComponentSettings?.charts?.actions?.panelPlacement
        ?.allowedPlacement?.[0]
    ).toBe("right");
    expect(
      results.webOCComponentSettings?.charts?.actions?.panelPlacement
        ?.allowedPlacement?.[1]
    ).toBe("all");
    expect(
      results.webOCComponentSettings?.charts?.actions?.panelPlacement
        ?.allowedPlacement?.[2]
    ).toBe("left");
    expect(
      results.webOCComponentSettings?.charts?.actions?.panelPlacement
        ?.allowedPlacement?.[3]
    ).toBe("bottom");
    expect(
      results.webOCComponentSettings?.charts?.actions?.panelPlacement
        ?.allowedPlacement?.[4]
    ).toBe("detached");
    expect(
      results.webOCComponentSettings?.charts?.actions?.downloadData
    ).toBe(true);
    expect(
      results.webOCComponentSettings?.charts?.actions?.downloadMetaData
    ).toBe(true);
    expect(
      results.webOCComponentSettings?.charts?.actions?.downloadFigure
    ).toBe(true);
    expect(
      results.webOCComponentSettings?.charts?.timeSeriesChart?.enabled
    ).toBe(true);
    expect(
      results.webOCComponentSettings?.charts?.timeSeriesChart?.legend
        ?.minNumberOfLines
    ).toBe("1");
    expect(
      results.webOCComponentSettings?.charts?.timeSeriesChart?.legend
        ?.maxNumberOfLines
    ).toBe("2");
    expect(
      results.webOCComponentSettings?.charts?.timeSeriesChart?.legend?.placement
    ).toBe("auto");
    expect(
      results.webOCComponentSettings?.charts?.timeSeriesChart?.xAxis?.enabled
    ).toBe(true);
    expect(
      results.webOCComponentSettings?.charts?.timeSeriesChart?.xAxis?.xTicks
    ).toBe(false);
    expect(
      results.webOCComponentSettings?.charts?.timeSeriesChart?.xAxis?.xLabel
    ).toBe(true);
    expect(
      results.webOCComponentSettings?.charts?.timeSeriesChart?.yAxis?.enabled
    ).toBe(true);
    expect(
      results.webOCComponentSettings?.charts?.timeSeriesChart?.yAxis?.yTicks
    ).toBe(false);
    expect(
      results.webOCComponentSettings?.charts?.timeSeriesChart?.yAxis?.yLabel
    ).toBe(true);
  });
});
