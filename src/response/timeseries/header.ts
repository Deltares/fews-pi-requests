import { PiDate } from "../base/piDate";
import { TimeStep } from "../base/timeStep";
import { DomainAxis } from "./domainAxis";
import { Product } from "./product";
import { Threshold } from "./threshold";

export interface Header {
    type: 'accumulative' | 'instantaneous';
    moduleInstanceId?: string;
    locationId: string;
    parameterId: string;
    domainParameterId?: string[]; // data type?
    qualifierId?: string[];
    ensembleId?: string;
    // Only one of the following two is defined (only) if ensembleId is defined.
    ensembleMemberIndex?: string; // non-negative number
    ensembleMemberId?: string; // string identifier
    timeStep: TimeStep;
    startDate: PiDate; // Date/time of the first event
    endDate: PiDate; // Date/time of the last event
    forecastDate?: PiDate; // Date/time of the forecast
    approvedDate?: PiDate; // Date/time that the forecast was made current
    missVal: string; // number
    longName?: string; // Of what?
    stationName?: string;
    lat?: string; // number
    lon?: string; // number
    x?: string; // number
    y?: string; // number
    z?: string; // number
    units?: string;
    domainAxis?: DomainAxis[];
    sourceOrganisation?: string;
    sourceSystem?: string;
    fileDescription?: string;
    creationDate?: string;
    creationTime?: string;
    region?: string;
    threshold?: Threshold;
    firstValueTime?: PiDate;
    lastValueTime?: PiDate;
    maxValue?: string; // number
    minValue?: string; // number
    valueCount: string; // number
    product?: Product;
  }
  