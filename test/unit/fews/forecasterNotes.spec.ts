import { PiWebserviceProvider } from "../../../src/piWebserviceProvider";
import expectedResponse from "../mock/forecasternotes.json";
import fetchMock from "fetch-mock";
import { ForecasterNotesFilter } from "../../../src/requestParameters/forecasterNotesFilter";

import { describe, it, expect } from 'vitest';

describe("forecasterNotes", function () {  it("generates a valid forecasterNotes request", async function () {
    const baseUrl =
      "https://mock.dev/fewswebservices/rest/fewspiservice/v1/forecasternotes";
    const queryParams = `noteGroupId=notegroup2`;

    const url = `${baseUrl}?${queryParams}`;

    fetchMock.get(url, {
      status: 200,
      body: expectedResponse,
    });

    const provider = new PiWebserviceProvider(
      "https://mock.dev/fewswebservices"
    );

    const filter: ForecasterNotesFilter = {
      noteGroupId: "notegroup2",
    };
    const results = await provider.getForecasterNotes(filter);
    expect(results).toStrictEqual(expectedResponse);
    expect(results.noteGroups?.length).toBe(1);
    expect(results.noteGroups?.[0].id).toBe("notegroup2");
    expect(results.noteGroups?.[0].name).toBe("NoteGroup2");
    expect(results.noteGroups?.[0].note?.eventCodeId).toBe("Manual.event.notegroup1");
    expect(results.noteGroups?.[0].note?.maxNumberOfLines).toBe(5);
    expect(results.noteGroups?.[0].note?.maxNumberOfCharactersInLine).toBe(100);
    expect(results.noteGroups?.[0].note?.messageTemplateId).toBe("custom");
    expect(results.noteGroups?.[0].note?.messageTemplate?.message).toBe("custom text");
    expect(results.noteGroups?.[0].note?.messageTemplate?.messageHeight).toBe(200);
    expect(results.noteGroups?.[0].note?.messageTemplate?.messageWidth).toBe(400);
  });
});
