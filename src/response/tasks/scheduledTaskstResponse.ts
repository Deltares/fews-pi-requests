import { Records } from "./records";
import { Task } from "./task";

export interface ScheduledTasksResponse extends Records {
  tasks:             Task[];
  // Are there any remote Master Controllers available in the response. Can be used to filter out the mcId column.
  remoteMcAvailable: boolean;
  // Are there any whatIf scenario’s available in the resonsponse
  whatIfAvailable:   boolean;
  // Are there any tags available in the response
  tagAvailable:      boolean;
}
