import {
  TimeSeriesResult as DdTimeSeriesResult,
  Event as DdEvent,
  Location as DdLocation,
  Node as DdNode,
  Paging as DdPaging,
  Provider as DdProvider,
  Source as DdSource,
  ObservationType as DdObservationType,
  TimeSeriesResponse as DdTimeSeriesResponse,
} from 'dd-api'
import {
  FewsPiDate,
  Header as FewsPiHeader,
  Event as FewsPiEvent,
  TimeSeriesResult as FewsPiTimeSeriesResult,
  TimeSeriesResponse as FewsPiTimeSeriesResponse,
} from './interfaces/response'

/**
 * Converts a FEWS PI date object to a JavaScript Date object.
 *
 * @param dateIn Date to convert in FEWS PI format
 * @returns Input date converted to a JavaScript Date object.
 */
function convertFewsPiDate(dateIn: FewsPiDate): Date {
  // TODO CJV: Is time zone conversion necessary, or are the dates in UTC?
  const dateTokens = dateIn.date.split('-')
  const timeTokens = dateIn.time.split(':')

  const dateOut = new Date()
  dateOut.setUTCFullYear(+dateTokens[0])
  dateOut.setUTCMonth(+dateTokens[1])
  dateOut.setUTCDate(+dateTokens[2])
  dateOut.setUTCHours(+timeTokens[0])
  dateOut.setUTCMinutes(+timeTokens[1])
  dateOut.setUTCSeconds(+timeTokens[2])

  return dateOut
}

/**
 * Optionally converts a FEWS PI date object to a JavaScript Date object.
 *
 * @param dateIn Optional date to convert in FEWS PI format
 * @returns Input date converted to a JavaScript Date object or undefined if
 *          the input date was undefined.
 */
function convertOptionalFewsPiDate(
  dateIn: FewsPiDate | undefined
): Date | undefined {
  return dateIn ? convertFewsPiDate(dateIn) : undefined
}

/**
 * Converts separate FEWS PI date and time strings to a Javascript Date object.
 *
 * @param date Date as a string with the format YYYY-MM-DD
 * @param time Time as a string with the format hh:mm:ss
 * @returns Input date converted to a Javascript Date object.
 */
function convertDate(date: string, time: string): Date {
  return convertFewsPiDate({ date, time })
}

/**
 * Converts separate, optional FEWS PI date and time strings to a Javascript Date object.
 *
 * If the date is not specified, it returns undefined. If the time is not
 * specified, it assumes a time of 00:00:00.
 *
 * @param date Optional date as a string with the format YYYY-MM-DD
 * @param time Optional time as a string with the format hh:mm:ss
 * @returns Input date converted to a Javascript Date object or undefined.
 */
function convertOptionalDate(date?: string, time?: string): Date | undefined {
  // If we do not specify a date, we discard the time.
  if (!date) {
    return undefined
  }
  // If the time is not specified, we use a default.
  if (!time) {
    time = '00:00:00'
  }
  return convertDate(date, time)
}

/**
 * Creates an empty placeholder node.
 */
function createPlaceholderNode(): DdNode {
  return {
    id: '',
    baseUrl: '',
    name: '',
    description: '',
  }
}

/**
 * Creates a DD API Source object from a FEWS PI header.
 *
 * @param headerFews FEWS PI time series header
 * @returns Source object in the DD API format
 */
function createSourceFromFewsHeader(headerFews: FewsPiHeader): DdSource {
  return {
    process: '',
    name: headerFews.sourceSystem,
    description: headerFews.fileDescription,
    realizationCount: undefined,
    institution: {
      name: headerFews.sourceOrganisation || '',
      description: '',
    },
  }
}

/**
 * Creates a DD API Location object from a FEWS PI header.
 *
 * @param headerFews FEWS PI time series header
 * @returns Location object in the DD API format
 */
function createLocationFromFewsPiHeader(headerFews: FewsPiHeader): DdLocation {
  return {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [
        headerFews.lon ? +headerFews.lon : 0,
        headerFews.lat ? +headerFews.lat : 0,
      ],
    },
    properties: {
      node: createPlaceholderNode(),
      url: '',
      locationId: headerFews.locationId,
      locationCode: headerFews.locationId,
      locationName: headerFews.stationName || '',
      crsName: undefined,
    },
  }
}

/**
 * Creates a DD API ObservationType object from a FEWS PI header.
 *
 * @param headerFews FEWS PI time series header
 * @returns ObservationType object in the DD API format
 */
function createObservationTypeFromFewsPiHeader(
  headerFews: FewsPiHeader
): DdObservationType {
  return {
    id: '',
    url: '',
    node: createPlaceholderNode(),
    quantity: headerFews.parameterId,
    compartment: '',
    description: headerFews.fileDescription,
    unit: headerFews.units || '',
    parameterCode: undefined,
  }
}

/**
 * Converts the FEWS PI time series event to a DD API time series event.
 *
 * @param eventFews Event object in FEWS PI format
 * @param missingValue Placeholder for missing values
 * @returns Time series event in the DD API format
 */
function convertFewsPiEventToDdEvent(
  eventFews: FewsPiEvent,
  missingValue: number
): DdEvent {
  return {
    timeStamp: convertDate(eventFews.date, eventFews.time),
    value: eventFews.value ? +eventFews.value : missingValue,
    quality: eventFews.flag ? +eventFews.flag : NaN,
    startTime: convertOptionalDate(eventFews.startDate, eventFews.startTime),
    endTime: convertOptionalDate(eventFews.endDate, eventFews.endTime),
    resultTime: undefined, // obtainable from somewhere?
  }
}

/**
 * Converts a time series in FEWS PI format to DD API format.
 *
 * @param timeseriesFews Time series in FEWS PI format
 * @returns Time series in DD API format
 */
export function convertFewsPiTimeseriesToDdTimeseries(
  timeseriesFews: FewsPiTimeSeriesResult
): DdTimeSeriesResult {
  const header = timeseriesFews.header

  // First, convert all events individually.
  const events: DdEvent[] = []
  if (timeseriesFews.events) {
    // The FEWS PI result is allowed to have missing values. In these cases, we
    // supply a default value that might come from the FEWS PI header, or
    // otherwise NaN.
    const missingValue = header.missVal ? +header.missVal : NaN

    // Convert each event individually.
    for (const eventFews of timeseriesFews.events) {
      events.push(convertFewsPiEventToDdEvent(eventFews, missingValue))
    }
  }

  // Compose the time series result.
  const timeseriesDd: DdTimeSeriesResult = {
    id: '',
    url: '',
    node: createPlaceholderNode(),
    source: createSourceFromFewsHeader(header),
    location: createLocationFromFewsPiHeader(header),
    observationType: createObservationTypeFromFewsPiHeader(header),
    analysisTime: convertOptionalFewsPiDate(header.forecastDate),
    startTime: convertFewsPiDate(header.startDate),
    endTime: convertFewsPiDate(header.endDate),
    // If ensembleMemberId is specified instead of ensembleMemberIndex, we won't see it.
    realization: header.ensembleMemberIndex
      ? +header.ensembleMemberIndex
      : undefined,
    events,
  }

  return timeseriesDd
}

/**
 * Converts a FEWS PI time series API response to DD API format.
 *
 * @param responseFews Time series API response from FEWS PI
 * @returns Time series API response in DD API format
 */
export function convertFewsPiTimeseriesResponseToDdTimeseriesResponse(
  responseFews: FewsPiTimeSeriesResponse
): DdTimeSeriesResponse {
  const provider: DdProvider = {
    name: 'FEWS PI',
    supportUrl: 'https://rwsos.webservices.deltares.nl/iwp/FewsWebServices/',
    apiVersion: responseFews.version || '',
    responseType: 'timeseries',
    responseTimestamp: new Date(),
  }
  const paging: DdPaging = {
    totalObjectCount: responseFews.timeSeries.length,
    prev: null,
    next: '',
    minPageSize: 1,
    maxPageSize: 10000,
  }

  // Convert each time series individually.
  const results: DdTimeSeriesResult[] = []
  for (const timeseriesFews of responseFews.timeSeries) {
    results.push(convertFewsPiTimeseriesToDdTimeseries(timeseriesFews))
  }

  // Compose the final response object.
  const responseDd: DdTimeSeriesResponse = {
    provider,
    paging,
    results,
  }

  return responseDd
}
