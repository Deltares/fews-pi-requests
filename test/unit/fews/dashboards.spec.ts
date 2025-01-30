import { PiWebserviceProvider } from "../../../src";
import { DashboardsFilter } from "../../../src/requestParameters/dashboardsFilter";

import expectedResponse from "../mock/dashboards.json";
import "cross-fetch/polyfill";
import fetchMock from "fetch-mock";

describe("dashbaords", function () {
  afterAll(() => {
    fetchMock.restore();
  });

  it("gets called when done", async () => {
    fetchMock.get(
      "https://mock.dev/fewswebservices/rest/fewspiservice/v1/dashboards",
      {
        status: 200,
        body: JSON.stringify(expectedResponse),
      }
    );

    const provider = new PiWebserviceProvider(
      "https://mock.dev/fewswebservices"
    );

    const dashboardsFilter: DashboardsFilter = {};

    const results = await provider.getDashboards(dashboardsFilter);
    expect(results).toStrictEqual(expectedResponse);

    const dashboard = results.dashboards?.[0];
    expect(dashboard?.id).toBe("dashboard2");
    expect(dashboard?.name).toBe("dashboardname2");
    expect(dashboard?.cssTemplate).toBe("dashboard_template.css");

    const groups = dashboard?.groups;
    expect(groups?.length).toBe(2);

    const group1 = groups?.[0];
    expect(group1?.elements?.length).toBe(2);

    const group1Element1 = group1?.elements?.[0];
    expect(group1Element1?.gridTemplateArea).toBe("area1");
    expect(group1Element1?.items?.length).toBe(1);
    expect(group1Element1?.items?.[0].topologyNodeId).toBe("schematic");
    expect(group1Element1?.items?.[0].component).toBe(
      "schematic-status-display"
    );
    expect(group1Element1?.items?.[0].componentSettingsId).toBe("settingsId1");

    const group1Element2 = group1?.elements?.[1];
    expect(group1Element2?.gridTemplateArea).toBe("area2");
    expect(group1Element2?.items?.length).toBe(1);
    expect(group1Element2?.items?.[0].topologyNodeId).toBe("map_currents");
    expect(group1Element2?.items?.[0].component).toBe("map");
    expect(group1Element2?.items?.[0].componentSettingsId).toBe("settingsId1");

    const group2 = groups?.[1];
    expect(group2?.elements?.length).toBe(3);

    const group2Element1 = group2?.elements?.[0];
    expect(group2Element1?.gridTemplateArea).toBe("area3");
    expect(group2Element1?.items?.length).toBe(1);
    expect(group2Element1?.items?.[0].topologyNodeId).toBe("SSD");
    expect(group2Element1?.items?.[0].component).toBe(
      "schematic-status-display"
    );
    expect(group2Element1?.items?.[0].componentSettingsId).toBe("settingsId1");

    const group2Element2 = group2?.elements?.[1];
    expect(group2Element2?.gridTemplateArea).toBe("area4");
    expect(group2Element2?.items?.length).toBe(1);
    expect(group2Element2?.items?.[0].topologyNodeId).toBe("chart_outflow");
    expect(group2Element2?.items?.[0].component).toBe("charts");
    expect(group2Element2?.items?.[0].componentSettingsId).toBe("settingsId1");

    const group2Element3 = group2?.elements?.[2];
    expect(group2Element3?.gridTemplateArea).toBe("area5");
    expect(group2Element3?.items?.length).toBe(1);
    expect(group2Element3?.items?.[0].topologyNodeId).toBe("chart_water_level");
    expect(group2Element3?.items?.[0].component).toBe("charts");
    expect(group2Element3?.items?.[0].componentSettingsId).toBe("settingsId1");
  });
});
