/*tslint:disable*/

/**
 * ArchiveProductsMetadataResponse PI_JSON
 */
export interface ArchiveProductsMetadata {
  /**
   * Archive Products Metadata
   */
  productsMetadata: ArchiveProductsMetadataEntry[];
}
export interface ArchiveProductsMetadataEntry {
  version?: string;
  areaId: string;
  sourceId: string;
  relativePathMetaDataFile: string;
  /**
   * Relative Path Products
   */
  relativePathProducts: string[];
  dataSetCreationTime?: string;
  timeZero?: string;
  /**
   * Archive Products Metadata Attributes
   */
  attributes: ArchiveProductsMetadataAttribute[];
}
export interface ArchiveProductsMetadataAttribute {
  key: string;
  value: string;
}
