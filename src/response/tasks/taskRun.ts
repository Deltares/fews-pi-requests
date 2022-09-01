import {TaskStatus} from "./taskStatus";

/**
 * The tasks/{taskid}/taskruns resource is used to get all taskruns for a specified task id.
 */
export interface TaskRun {
    // Id of the task run
    id: string;
    // Indicates if the taskrun is a forecast or not
    forecast: boolean;
    // Indicates if the taskrun is current or not
    current: boolean;
    // Status of the task
    status: string;
    //workflow id
    workflowId: string;
    //the time at which the task was dispatched
    dispatchTime: string;
    //the time at wich the task completed
    completionTime: string;
    //time zero of the task
    time0: string;
    //the user who started the task
    user: string;
    //the description of the task;
    description: string;
    //id of the fss
    fssId: string;
    //the start of the period for which data was created in the run
    outputStartTime: string;
    //the end of the period for which data was created in the run
    outputEndTime: string;


}

