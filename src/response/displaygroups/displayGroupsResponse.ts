import {ActionResult} from "../actions/index.js";
export interface DisplayGroupsResponse {
    resultsNotAvailableForRequest: boolean;
    results: ActionResult[];
}