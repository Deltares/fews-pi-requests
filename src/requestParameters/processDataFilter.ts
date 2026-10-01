import type { BaseFilter } from './baseFilter.js'

export interface ProcessDataFilter extends BaseFilter {
  workflowId: string
  xMin: number
  yMin: number
  xMax: number
  yMax: number
  xCellSize: number
  yCellSize: number
  startTime: string
  endTime: string
}
