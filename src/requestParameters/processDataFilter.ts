import type { BaseFilter } from "./baseFilter";

export interface ProcessDataFilter extends BaseFilter {
    workflowId: string;
    xMin: number;
    yMin: number;
    xMax: number;
    yMax: number;
    xCellSize: number;
    yCellSize: number;
    startTime: string;
    endTime: string;   
}