/* tslint:disable */

/**
 * Time step
 */
export type TimeStep =
  | {
      /**
       * Unit
       */
      unit: string;
      /**
       * Multiplier
       */
      multiplier?: string;
    }
  | {
      /**
       * Times
       */
      times: string;
    }
  | {
      /**
       * Minutes
       */
      minutes: string;
    };
/**
 * array of strings
 */
export type DomainAxisValueStringArray = string[];
/**
 * Domain Axis Value Array
 */
export type DomainAxisValueArray = DomainAxisValueStringArray[];
/**
 * array of strings
 */
export type DomainAxisEventValuesStringArray = string[];
/**
 * array of arrays
 */
export type DomainAxisEventValuesArray = DomainAxisEventValuesStringArray[];

/**
 * TimeSeries PI_JSON
 */
export interface TimeSeriesResponse {
  /**
   * PI Version
   */
  version: string;
  /**
   * Time Zone of the timeSeries times
   */
  timeZone?: string;
  /**
   * Time series data represent data collected over a given period of time at a specific location
   */
  timeSeries?: TimeSeriesResult[];
}
export interface TimeSeriesResult {
  header?: Header;
  properties?: TimeSeriesProperty[];
  /**
   * Events
   */
  events?: TimeSeriesEvent[];
  /**
   * Domains
   */
  domains?: Domains[];
}
/**
 * The header
 */
export interface Header {
  /**
   * TimeSeries type
   */
  type: string;
  /**
   * Module Instance Id
   */
  moduleInstanceId?: string;
  /**
   * Location id
   */
  locationId: string;
  /**
   * Parameter id
   */
  parameterId: string;
  /**
   * Qualifier Id
   */
  qualifierId?: string[];
  /**
   * Ensemble Id. Can be followed by either a ensembleMemberIndex or ensembleMemberId
   */
  ensembleId?: string;
  /**
   * Ensemble Member Index
   */
  ensembleMemberIndex?: string;
  /**
   * Ensemble Member Id
   */
  ensembleMemberId?: string;
  timeStep?: TimeStep;
  startDate: FewsDate;
  endDate: FewsDate;
  forecastDate?: FewsDate;
  /**
   * Missing value
   */
  missVal: string;
  /**
   * Long name
   */
  longName?: string;
  /**
   * Station name
   */
  stationName?: string;
  /**
   * Latitude
   */
  lat?: string;
  /**
   * Longitude
   */
  lon?: string;
  /**
   * X
   */
  x?: string;
  /**
   * Y
   */
  y?: string;
  /**
   * Z
   */
  z?: string;
  /**
   * Units
   */
  units?: string;
  /**
   * Domain Axis
   */
  domainAxis?: DomainAxis[];
  /**
   * Source Organisation
   */
  sourceOrganisation?: string;
  /**
   * Source System
   */
  sourceSystem?: string;
  /**
   * File Descriptor
   */
  fileDescription?: string;
  /**
   * Creation date
   */
  creationDate?: string;
  /**
   * Creation time
   */
  creationTime?: string;
  approvedDate?: FewsDate;
  /**
   * Region
   */
  region?: string;
  /**
   * Thresholds
   */
  thresholds?: TimeSeriesThreshold[];
  firstValueTime?: FewsDate;
  lastValueTime?: FewsDate;
  /**
   * Max value
   */
  maxValue?: string;
  /**
   * Min value
   */
  minValue?: string;
  /**
   * Value count
   */
  valueCount?: string;
  /**
   * Max Warning Level Name
   */
  maxWarningLevelName?: string;
  product?: Product;
}
/**
 * Date
 */
export interface FewsDate {
  /**
   * Date
   */
  date: string;
  /**
   * Time
   */
  time: string;
}
export interface DomainAxis {
  /**
   * Parameter Id
   */
  parameterId: string;
  /**
   * Units
   */
  units?: string;
}
/**
 * Threshold
 */
export interface TimeSeriesThreshold {
  /**
   * Id
   */
  id?: string;
  /**
   * Name
   */
  name?: string;
  /**
   * Label
   */
  label?: string;
  /**
   * Description
   */
  description?: string;
  /**
   * Comment
   */
  comment?: string;
  /**
   * Value
   */
  value?: string;
  /**
   * Type
   */
  type?: string;
  /**
   * Group Id
   */
  groupId?: string;
  /**
   * Group Name
   */
  groupName?: string;
}
/**
 * Date
 */
export interface Product {
  /**
   * Id
   */
  id: string;
  /**
   * Name
   */
  name: string;
  /**
   * Product Date
   */
  productDate: string;
  /**
   * Product Time
   */
  productTime: string;
  /**
   * Category
   */
  category: {
    /**
     * Id
     */
    id: string;
    /**
     * Name
     */
    name: string;
  };
  /**
   * Product Info
   */
  productInfo?: {
    /**
     * User
     */
    user: string;
    /**
     * Confidence
     */
    confidence: string;
    /**
     * Classification
     */
    classification: string;
    /**
     * Comment
     */
    comment: string;
  }[];
}
/**
 * Property
 */
export interface TimeSeriesProperty {
  [k: string]: unknown;
}
/**
 * Timeseries event
 */
export interface TimeSeriesEvent {
  /**
   * Date
   */
  date: string;
  /**
   * Time
   */
  time: string;
  /**
   * Start Date
   */
  startDate?: string;
  /**
   * Start Time
   */
  startTime?: string;
  /**
   * End Date
   */
  endDate?: string;
  /**
   * End Time
   */
  endTime?: string;
  /**
   * Value
   */
  value: string;
  /**
   * Value source. Possible values are: MAN (manual), MOD (modifier), CYC (cyclic) and PER (persistent).
   */
  valueSource?: "MAN" | "MOD" | "CYC" | "PER";
  /**
   * Minimum Value
   */
  minValue?: string;
  /**
   * Maximum Value
   */
  maxValue?: string;
  /**
   * Detection Symbol. One of < (below detection range), > (above detection range) or ~ (varying)
   */
  detection?: "<" | ">" | "~";
  /**
   * Flag. Possible values are: 0=original reliable, 1=corrected reliable, 2=completed reliable, 3=original doubtful, 4=corrected doubtful, 5=completed doubtful, 6=original unreliable, 7=corrected unreliable, 8=completed unreliable, 9=original missing, 10=deleted, 11=set original reliable, 12=set original unreliable, 13=archive missing.
   */
  flag: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13";
  /**
   * Flag Source. Possible values are: MAN=MANUAL, IMP=IMPORTED, MOD=MODIFIER, SN=SOFT_MIN, HN=HARD_MIN, SX=SOFT_MAX, HX=HARD_MAX, ROR=RATE_OF_RISE, ROF=RATE_OF_FALL, SR=SAME_READING, TS=TEMPORARY_SHIFT, SC=SERIES_COMPARISON, FC=FLAGS_COMPARISON, SH=SPATIAL_HOMOGENEITY, MK=MANN_KENDALL, SFP=START_FLAG_PERSISTENCY, SVP=SECONDARY_VALIDATION_FLAG_PERSISTENCY, CA=CONDITIONAL_AGGREGATION, OSC=OSCILLATION, null
   */
  flagSource?:
    | "MAN"
    | "IMP"
    | "MOD"
    | "SN"
    | "HN"
    | "SX"
    | "HX"
    | "ROR"
    | "ROF"
    | "SR"
    | "TS"
    | "SC"
    | "FC"
    | "SH"
    | "MK"
    | "SFP"
    | "SVP"
    | "CA"
    | "OSC"
    | null;
  /**
   * Flag Source Column
   */
  flagSourceColumn?: {
    [k: string]: unknown;
  };
  /**
   * State. Possible values are: dried, inundated, ice
   */
  state?: "dried" | "inundated" | "ice";
  /**
   * Comment
   */
  comment?: string;
  /**
   * User
   */
  user?: string;
}
/**
 * Domains
 */
export interface Domains {
  /**
   * Domain Axis Values
   */
  domainAxisValues?: DomainAxisValue[];
  /**
   * Domain Axis Events
   */
  events?: DomainAxisEvent[];
}
/**
 * Domain Axis Value
 */
export interface DomainAxisValue {
  /**
   * Parameter Id
   */
  parameterId?: string;
  values?: DomainAxisValueArray;
}
/**
 * Domain Axis Event Array
 */
export interface DomainAxisEvent {
  /**
   * Date
   */
  date?: string;
  /**
   * Time
   */
  time?: string;
  /**
   * Flag
   */
  flag?: string;
  values?: DomainAxisEventValuesArray;
}
