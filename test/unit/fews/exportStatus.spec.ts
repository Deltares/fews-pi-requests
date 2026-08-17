import {PiWebserviceProvider} from '../../../src/piWebserviceProvider'

import expectedResponse from '../mock/exportStatus.json'
import fetchMock from "fetch-mock";

import { describe, it, expect } from 'vitest';

describe("export/status", function () {
    it("gets called when done", async function () {
        fetchMock.get("https://mock.dev/fewswebservices/rest/fewspiservice/v1/export/status?documentFormat=PI_JSON", {
            status: 200,
            body: JSON.stringify(expectedResponse)
        });

        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")

        const results = await provider.getExportStatus();
        expect(results).toStrictEqual(expectedResponse);
        expect("exportStatus" in results).toBe(true);
        expect(results.exportStatus.length).toBe(1);
    });

    it("returns items with the correct fields", async function () {
        fetchMock.get("https://mock.dev/fewswebservices/rest/fewspiservice/v1/export/status?documentFormat=PI_JSON", {
            status: 200,
            body: JSON.stringify(expectedResponse)
        });

        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")
        const results = await provider.getExportStatus();
        const item = results.exportStatus[0];

        expect(item.mcId).toBe("MC1");
        expect(item.workflowId).toBe("ExportWorkflow");
        expect(item.taskRunId).toBe("task-001");
        expect(item.workflowName).toBe("Export Workflow");
        expect(item.suspended).toBe(false);
        expect(item.directory).toBe("/export/data");
        expect(item.dataFeed).toBe("export-feed-1");
        expect(item.dataFeedName).toBe("Export Feed 1");
        expect(item.dataFeedDescription).toBe("First export data feed");
        expect(item.lastSuccessfulTime).toBe("2024-01-15T12:00:00Z");
        expect(item.lastSuccessfulFile).toBe("export_20240115.nc");
        expect(item.filesSuccessfulCount).toBe(42);
        expect(item.filesFailedCount).toBe(0);
        expect(item.lastSuccessfulTimeBackgroundColor).toBe("#00FF00");
        expect(item.status).toBe("success");
    });
});
