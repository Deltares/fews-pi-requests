import {
  PiWebserviceProvider,
  LogDisplayLogsFilter,
} from "../../../src";

import expectedResponse from "../mock/logDisplayLogs.json";
import "cross-fetch/polyfill";
import fetchMock from "fetch-mock";

describe("logDisplayLogs", function () {
  afterAll(() => {
    fetchMock.restore();
  });

  it("gets called when done", async () => {
    fetchMock.get(
      "https://mock.dev/fewswebservices/rest/fewspiservice/v1/logdisplays/admin.log/logs?logType=manual&level=info&eventCode=Manual.event.testnotegroup1",
      {
        status: 200,
        body: JSON.stringify(expectedResponse),
      }
    );

    const provider = new PiWebserviceProvider(
      "https://mock.dev/fewswebservices"
    );

    const logDisplayLogsFilter: LogDisplayLogsFilter = {
      logDisplayId: "admin.log",
      logType: "manual",
      level: "info",
      eventCode: "Manual.event.testnotegroup1",
    };

    const results = await provider.getLogDisplayLogs(logDisplayLogsFilter);
    expect(results).toStrictEqual(expectedResponse);
    expect(results.logs?.length).toBe(2);
    expect(results.logs?.[0].id).toBe(0);
    expect(results.logs?.[0].taskRunId).toBe("1");
    expect(results.logs?.[0].code).toBe("New.run");
    expect(results.logs?.[0].entryTime).toBe("2025-02-01T00:40:13.389Z");
    expect(results.logs?.[0].text).toBe("Run surge");
    expect(results.logs?.[0].level).toBe("INFO");
    expect(results.logs?.[0].componentId).toBe("FS");
    expect(results.logs?.[0].eventAcknowledged).toBe(true);
    expect(results.logs?.[0].user).toBe(undefined);
    expect(results.logs?.[0].topologyNodeId).toBe(undefined);

    expect(results.logs?.[1].id).toBe(1);
    expect(results.logs?.[1].taskRunId).toBe("2");
    expect(results.logs?.[1].code).toBe("Manual.event.testnotegroup1");
    expect(results.logs?.[1].entryTime).toBe("2025-02-01T00:47:18.677Z");
    expect(results.logs?.[1].text).toBe("test get logs endpoint");
    expect(results.logs?.[1].level).toBe("INFO");
    expect(results.logs?.[1].componentId).toBe("OC");
    expect(results.logs?.[1].eventAcknowledged).toBe(true);
    expect(results.logs?.[1].user).toBe("Karl");
    expect(results.logs?.[1].topologyNodeId).toBe("schematic");
  });
});
