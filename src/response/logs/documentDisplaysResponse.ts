/* tslint:disable */

/**
 * DocumentDisplaysResponse PI_JSON
 */
export interface DocumentDisplaysResponse {
  documentDisplays?: (DocumentDisplayReport | DocumentDisplayBrowser | DocumentDisplayCompose)[];
  /**
   * List of workflows associated with the document displays
   */
  workflows?: DocumentDisplayWorkflow[];
}
export interface DocumentDisplayReport {
  /**
   * the id of the document display
   */
  id: string;
  /**
   * the name of the document display
   */
  name: string;
  /**
   * Indicates whether the user has edit permissions for the document display
   */
  editPermissions?: boolean;
  relativeViewPeriod?: RelativeViewPeriod;
  /**
   * the type the document display
   */
  type?: string;
  report: DocumentDisplayReportType;
}
export interface RelativeViewPeriod {
  unit: string;
  start: string;
  end: string;
}
export interface DocumentDisplayReportType {
  /**
   * the id of the report module instance
   */
  reportModuleInstanceId?: string;
  archiveProduct?: DocumentDisplayArchiveProduct;
  showReports?: DocumentDisplayShowReports;
  /**
   * Indicates whether the user can edit the report
   */
  editor?: boolean;
}
export interface DocumentDisplayArchiveProduct {
  id?: string;
  name?: string;
  areaId?: string;
  sourceId?: string;
  versionKeys?: string[];
  attributes?: DocumentDisplayArchiveProductAttribute[];
}
export interface DocumentDisplayArchiveProductAttribute {
  key?: string;
  value?: string;
}
export interface DocumentDisplayShowReports {
  /**
   * List of product workflow status IDs to show in the report
   */
  productWorkflowStatusIds?: string[];
}
export interface DocumentDisplayBrowser {
  /**
   * the id of the document display
   */
  id: string;
  /**
   * the name of the document display
   */
  name: string;
  /**
   * Indicates whether the user has edit permissions for the document display
   */
  editPermissions?: boolean;
  /**
   * the type the document display
   */
  type?: string;
  relativeViewPeriod?: RelativeViewPeriod;
  browser: DocumentDisplayBrowserType;
}
export interface DocumentDisplayBrowserType {
  layout?: {
    preview?: boolean;
    headers?: {
      name?: string;
      productProperty?: string;
      productAttribute?: string;
    }[];
  };
  archiveProducts?: DocumentDisplayArchiveProduct[];
  archiveProductSets?: DocumentDisplayArchiveProductSet[];
}
export interface DocumentDisplayArchiveProductSet {
  id?: string;
  constraints?: ArchiveProductSetConstraints;
}
export interface ArchiveProductSetConstraints {
  areaId?: string;
  sourceId?: string;
  allValid?: ArchiveProductSetConstraintsAttributeTextEquals[];
  anyValid?: ArchiveProductSetConstraintsAttributeTextEquals[];
}
export interface ArchiveProductSetConstraintsAttributeTextEquals {
  attributeTextEquals?: ArchiveProductSetConstraintsAttributeEquals;
}
export interface ArchiveProductSetConstraintsAttributeEquals {
  id?: string;
  equals?: string;
}
export interface DocumentDisplayCompose {
  /**
   * the id of the document display
   */
  id: string;
  /**
   * the name of the document display
   */
  name: string;
  /**
   * Indicates whether the user has edit permissions for the document display
   */
  editPermissions?: boolean;
  /**
   * the type the document display
   */
  type?: string;
  relativeViewPeriod?: RelativeViewPeriod;
  compose?: ProductAndTemplate;
}
export interface ProductAndTemplate {
  archiveProduct?: DocumentDisplayArchiveProduct;
  template?: DocumentDisplayArchiveProduct;
}
export interface DocumentDisplayWorkflow {
  /**
   * the id of the workflow
   */
  id: string;
  /**
   * List of workflow status IDs
   */
  statuses?: DocumentDisplayWorkflowStatus[];
  /**
   * List of workflow transition IDs
   */
  transitions?: DocumentDisplayWorkflowTransition[];
}
export interface DocumentDisplayWorkflowStatus {
  /**
   * the id of the status
   */
  id: string;
  /**
   * the name of the status
   */
  name?: string;
  attribute?: DocumentDisplayWorkflowStatusAttribute;
}
export interface DocumentDisplayWorkflowStatusAttribute {
  /**
   * the key of the workflow status attribute
   */
  key: string;
  value: string;
}
export interface DocumentDisplayWorkflowTransition {
  /**
   * the form status of the transition
   */
  fromStatus: string;
  /**
   * the form status of the transition
   */
  toStatus: string;
  /**
   * Indicates whether the user has edit permissions for the transition
   */
  editPermissions?: boolean;
}
