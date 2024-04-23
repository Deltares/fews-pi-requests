import type { BaseFilter } from "./baseFilter";

export interface RunTaskFilter extends BaseFilter {
    /**
     * Identifier of the task to run
     */
    workflowId: string;
    /**
     * Start of run period. Used for state selection period.
     */
    startTime?: string;
    /**
     *  Forecast time zero. If missing System time is used (optional)
     */
    timeZero?: string;
    /**
     * End of run period. Used to define forecast length.
     */
    endTime?: string;
    /**
     * Id of a coldstate. Can be used to force state selection (optional).
     */
    coldStateId?: string;
    /**
     * Id of a predefined WhatIf scenario. Can be used to alter run parameters (optional).
     */
    scenarioId?: string;
    /**
     * User id of the user that runs the task.
     * TODO: not optional according to the documentation
     */
    userId?: string;
    /**
     * Descriptive text to identify run.
     */
    description?: string;
    /**
     * Run option can be any of: all, alloneatatime or allmostrecentonly. If not set, the default is
     * used: all.
     * all                Multiple instances of this workflow can run simultaneously.
     * alloneatatime      Running (and queued) instances of this workflow prevail.
     * allmostrecentonly  A running instance of this workflow prevails. Queued instances of this
     *                    workflow will be replaced by a recent one.
     */
    runOption?: 'all' | 'alloneatatime' | 'allmostrecentonly';
    /**
     * Since 2023.02. Default is false. If it's set to true, the task will be run locally first, and
     * if the run is succesful, it will be promoted to the server.
     */
    runLocallyAndPromoteToServer?: boolean;
    /**
     * Since 2022.02. Properties can be included in the url. These will be used as
     * taskRunProperties, and override global or workflow properties. Each property has to be added
     * to the url seperately. Example:
     *
     *     &property(fileName)=exportFile&property(outputValue)=9.0
     *
     * Where the name of the property is fileName, the value is exportFile. The name of the second
     * property is outputValue, the value is 9.0.
     */
    properties?: { [key: string]: string | number }
}
