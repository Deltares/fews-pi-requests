import {
    DashboardsFilter,
    PiWebserviceProvider
} from "../../src";
import { describe, it, expect } from 'vitest';

const baseUrl = import.meta.env.VITE_DOCKER_URL || "";

describe("dashboards", function () {

    it("get all dashboard", async function () {
        const provider = new PiWebserviceProvider(baseUrl);
        const filter: DashboardsFilter = {
        }
        const res = await provider.getDashboards(filter)
        expect(res?.dashboards?.length).toBeGreaterThan(1);

    })

    it("get dashboard by id", async function () {
        const provider = new PiWebserviceProvider(baseUrl);
        const filter: DashboardsFilter = {
            dashboardId: 'rainfall_forecast'
        }
        const res = await provider.getDashboards(filter)
        expect(res?.dashboards?.length).toEqual(1);
        expect(res?.dashboards?.[0]?.id).toEqual('rainfall_forecast');
        const invalidFilter: DashboardsFilter = {
            dashboardId: 'rainfall_forecast_xxx'
        }
        await expect(provider.getDashboards(invalidFilter)).rejects.toBeInstanceOf(Error);

    })

})