export interface Event {
    date: string;
    time: string;
    startDate?: string;
    startTime?: string;
    endDate?: string;
    endTime?: string;
    value: string; // number
    minValue?: string; // number
    maxValue?: string; // number
    flag?: string; // number; related to quality
    flagSource?: string; // Validation rule used to determine the quality flag
    comment?: string;
    user?: string;
}
