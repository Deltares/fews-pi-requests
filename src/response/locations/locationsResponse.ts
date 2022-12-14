import { Location } from './location'
import { GeoJsonLocation } from './geoJsonLocation'
import { FeatureCollection, Geometry } from 'geojson';

export interface LocationsResponse {
    locations: Location[];
}

export type GeoJSONResponse = FeatureCollection<Geometry,GeoJsonLocation>