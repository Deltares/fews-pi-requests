import type { BaseFilter } from './baseFilter.js'

export interface WhatIfScenariosFilter extends BaseFilter {
  whatIfTemplateId?: string

  workflowId?: string
}
