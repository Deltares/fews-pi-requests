import type { BaseFilter } from "./baseFilter";

export interface WhatIfScenariosFilter extends BaseFilter {
  whatIfTemplateId?: string;

  workflowId?: string;
}
