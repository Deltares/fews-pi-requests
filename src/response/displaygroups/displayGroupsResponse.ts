import {Result} from "./result";

export interface DisplayGroupsResponse {
    resultsNotAvailableForRequest: boolean;
    results: Result[];
}