import isEmpty from 'lodash/isEmpty';
import { ActionTypes, DB_INDEXES } from '../../constants';
import appAPI from './api/appAPI';


function sortDates(list) {
    list.sort((a, b) => {
        a = a.substr(0, 10);
        b = b.substr(0, 10);
        a = a.split("-");
        b = b.split("-");
        return a[0] - b[0] || a[1] - b[1] || a[2] - b[2];
    });
    return list;
}

function getDates(data) {
    let trip_set = new Set();
    data.forEach((item) => {
        const date = item.substr(0, 10);
        trip_set.add(date);
    }); 
    return [...trip_set];
}

function createGeoJsonCombined(data) {
    let layers = [];
    let trips = [];
    let feature_combined_id = 0;
    let geojson = {
            "type":"FeatureCollection",
            "crs": {
                "type":"name",
                "properties": { 
                    "name":"urn:ogc:def:crs:OGC:1.3:CRS84"
                }
            },
            "features": []
        };
    const type = 'LineString';
    data.forEach((item) => {
        let feature = {
            "type":"Feature",
            "geometry": {
                "type":"",
                "coordinates":[]
            },
            "properties": {},
            "id": 0
        };
        const s1 = new Date(item['_source']['data']['start_time']);
        const s2 = new Date(item['_source']['data']['end_time']);
        feature['properties']['start_time'] = item['_source']['data']['start_time'];
        feature['properties']['end_time'] = item['_source']['data']['end_time'];
        const diff = (s2 - s1);
        feature['properties']['duration'] = diff/1000;
        feature['geometry']['type'] = type;
        feature['id'] = feature_combined_id;
        let speed_avg = 0;
        let count = 0;
        feature['properties']['trip'] = item['_source']['trip'];
        trips.push(item['_source']['trip']);
        let speed_list = [];
        let dist_list = [];
        item['_source']['data']['coords'].forEach((c) => {
            const lat = c['lat'];
            const lng = c['lng'];
            speed_avg += c['speed'];
            speed_list.push(c['speed']);
            dist_list.push(c['dist']);
            count++;
            feature['geometry']['coordinates'].push([lng, lat]);
        });
        feature['properties']['speed_avg'] = speed_avg / count;
        feature['properties']['speed'] = speed_list;
        feature['properties']['distance'] = dist_list[dist_list.length - 1];
        feature['properties']['index'] = feature_combined_id;
        feature['properties']['fname'] = item['_source']['trip'];
        geojson['features'].push(feature);
        feature_combined_id++;
    });
    layers.push(geojson);
    return [ layers, trips ];
}

export function loadMapData() {
    return (dispatch) => {
        const index = DB_INDEXES[2];
        appAPI.getIndexTotalRecords(index)
        .then((res) => {
            const size = res.data.hits.total;
            const query = JSON.stringify({
                "query" : {
                    "match_all" : {}
                  }
                });
            dispatch(fetchDataBySize(index, size, query));
        }).catch((e) => {
            console.log(e);
        });
    }
}

export function fetchSingleTripData(trip) {
    return (dispatch) => {
        const index = DB_INDEXES[2];
        let query = JSON.stringify({
            "query" : {
                "match": {
                    "trip": trip
                }
            }
        });
        appAPI.getSingleTrip(index, query)
        .then((res) => {
            const data = [res.data.hits.hits[0]];
            const [ layers ] = createGeoJsonCombined(data);
            dispatch(handleLoadMapData(layers));
            dispatch(handleSingleTrip(true));
            dispatch(handleDateTrip(false));
            dispatch(handleTimeTrip(false));
        }).catch((e) => {
            console.log(e);
            dispatch(handleLoadMapData([]));
        });
    }
}

export function fetchDataByDate(date) {
    return (dispatch, getState) => {
        let new_map_data = getState().app.map_data;
        let geojson = {
            "type":"FeatureCollection",
            "crs": {
                "type":"name",
                "properties": { 
                    "name":"urn:ogc:def:crs:OGC:1.3:CRS84"
                }
            },
            "features": []
        };
        let features = [];
        new_map_data[0]['features'].forEach((item) => {
            const item_data = item['properties']['start_time'].split('T')[0];
            if(item_data === date) {
                features.push(item);
            }
        });
        geojson['features'] = features;
        dispatch(handleLoadMapData([geojson]));
        dispatch(handleSingleTrip(false));
        dispatch(handleDateTrip(true));
        dispatch(handleTimeTrip(false));
    }
}

export function fetchDataByTime(time) {
    return (dispatch, getState) => {
        let new_map_data = getState().app.map_data;
        let geojson = {
            "type":"FeatureCollection",
            "crs": {
                "type":"name",
                "properties": { 
                    "name":"urn:ogc:def:crs:OGC:1.3:CRS84"
                }
            },
            "features": []
        };
        let features = [];
        new_map_data[0]['features'].forEach((item) => {
            const item_data = item['properties']['start_time'].split('T')[1];
            const start = time.split("-")[0];
            const end = time.split("-")[1];
            if(item_data >= start && item_data <= end) {
                features.push(item);
            }
        });
        geojson['features'] = features;
        dispatch(handleLoadMapData([geojson]));
        dispatch(handleSingleTrip(false));
        dispatch(handleDateTrip(false));
        dispatch(handleTimeTrip(true));
    }
}

function fetchDataBySize(index, size, query) {
    return (dispatch) => {
        appAPI.getTripsData(index, size, query)
        .then((res) => {
            const data = res.data.hits.hits;
            const [ layers, trips ] = createGeoJsonCombined(data);
            sortDates(trips);
            dispatch(handleLoadMapData(layers));
            dispatch(handleLoadTrips(trips));
            const dates = getDates(trips);
            dispatch(handleDates(dates));
            dispatch(handleSingleTrip(false));
            dispatch(handleDateTrip(false));
            dispatch(handleTimeTrip(false));
        }).catch((e) => {
            console.log(e);
            dispatch(handleLoadMapData([]));
            dispatch(handleLoadTrips([]));
        });
    }
}

function handleLoadMapData(data) {
    return {
        type: ActionTypes.LOAD_DATA,
        data
    }
}

function handleLoadTrips(data) {
    return {
        type: ActionTypes.SET_TRIPS,
        data
    }
}

function handleSingleTrip(data) {
    return {
        type: ActionTypes.SET_SINGLE_TRIP,
        data
    }
}

function handleDates(data) {
    return {
        type: ActionTypes.SET_DATES,
        data
    }
}

function handleDateTrip(data) {
    return {
        type: ActionTypes.SET_DATE_TRIP,
        data
    }
}

function handleTimeTrip(data) {
    return {
        type: ActionTypes.SET_TIME_TRIP,
        data
    }
}