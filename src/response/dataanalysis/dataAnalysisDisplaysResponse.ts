/* tslint:disable */

export interface DataAnalysisDisplaysResponse {
  dataAnalysisDisplays?: DataAnalysisDisplayElement[];
}
export interface DataAnalysisDisplayElement {
  id: string;
  name: string;
  relativeViewPeriod: RelativeViewPeriod;
  filters: Filter[];
  selectionPanel: SelectionPanel;
  toolBoxes: ToolBoxes;
  archiveCoupling?: ArchiveCoupling;
}
export interface RelativeViewPeriod {
  unit: string;
  start: string;
  end: string;
}
export interface Filter {
  id: string;
  name: string;
}
export interface SelectionPanel {
  locationSelection: Selection;
  parameterSelection: Selection;
  moduleInstanceSelection: Selection1;
  locationAttributeSelection: LocationAttributeSelection;
}
export interface Selection {
  name: string;
}
export interface Selection1 {
  name: string;
  enabled?: boolean;
}
export interface LocationAttributeSelection {
  enabled?: boolean;
  attributes?: LocationAttributeSelection1[];
}
export interface LocationAttributeSelection1 {
  attributeId: string;
  name: string;
}
export interface ToolBoxes {
  resampling: Correlation;
  correlation?: Correlation;
  toolboxWorkflows?: ToolboxWorkflow[];
}
export interface Correlation {
  enabled: boolean;
}
export interface ToolboxWorkflow {
  id: string;
  name: string;
  workflowId: string;
  whatIfTemplateId: string;
  results: Results;
  iconId?: string;
}
export interface Results {
  filterId: string;
  archiveProductId: string;
}
export interface ArchiveCoupling {
  enabled: boolean;
  metaData: MetaData;
}
export interface MetaData {
  properties: Properties;
  attributes: Record<string, string>[];
}
export interface Properties {
  areaId: string;
  sourceId: string;
}
