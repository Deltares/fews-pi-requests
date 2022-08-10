import { Attribute } from "../attributes/attribute";

export interface ProductsMetaData {
    version:                  number;
    areaId:                   string;
    sourceId:                 string;
    relativePathMetaDataFile: string;
    relativePathProducts:     string[];
    dataSetCreationTime:      string;
    timeZero:                 string;
    attributes:               Attribute[];
}