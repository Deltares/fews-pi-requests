import type { BaseFilter } from "./baseFilter";

export interface LogDisplaysFilter extends BaseFilter {
  /**
   * the id of the log display
   */
  logDisplayId: string;
}
