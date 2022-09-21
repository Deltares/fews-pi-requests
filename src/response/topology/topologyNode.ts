export interface TopologyNode {
    id: string;
    name: string;
    workflowId?: string;
    localRun?: boolean;
    topologyNodes?: TopologyNode[];
}