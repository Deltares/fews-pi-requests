import { Property } from "../base/property";
import { Header } from "./header";
import { Event } from "./event";
import { DomainAxisValue } from "./domainAxisValue";

export interface TimeSeriesResult {
    header: Header;
    properties?: Property[];
    domainAxisValues?: DomainAxisValue[];
    events?: Event[];
    comment?: string;
  }
  