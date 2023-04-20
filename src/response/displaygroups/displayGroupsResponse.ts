import type {ActionResult} from "../actions";

export interface DisplayGroupsResponse {
    resultsNotAvailableForRequest: boolean;
    results: ActionResult[];
}