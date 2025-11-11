import {PiWebserviceProvider} from '../../../src/piWebserviceProvider'
import fetchMock from "fetch-mock";
import expectedResponse from '../mock/historyEdits.json'
import {HistoryEditsFilter} from "../../../src/requestParameters/historyEditsFilter";

import { describe, it, expect } from 'vitest';

describe("history edit", function () {    it("timeseries json response", async function () {
        fetchMock.get("https://mock.dev/fewswebservices/myRelativePath&times=aaa&times=bbb", {
            status: 200,
            body: JSON.stringify(expectedResponse)
        });

        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")
        const filter: HistoryEditsFilter = {
            times: ["aaa", "bbb"],
            editUrl: "myRelativePath",
        }
        const results = await provider.getHistoryEdits(filter);
        expect(results).toStrictEqual(expectedResponse);

    });
});
