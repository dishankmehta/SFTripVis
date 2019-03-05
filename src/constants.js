import keyMirror from 'key-mirror';


export const ActionTypes = keyMirror({
    LOAD_DATA: null,
    SET_TRIPS: null,
    SET_SINGLE_TRIP: null,
    SET_DATES: null,
    SET_DATE_TRIP: null,
    SET_TIME: null,
    SET_TIME_TRIP: null,
});

export const BINS = [
    { color: [102, 189, 99], name: '0 - 7.26' },
    { color: [217, 239, 139], name: '7.26 - 12.38' },
    { color: [254, 224, 139], name: '12.38 - 18.78' },
    { color: [244, 109, 67], name: '18.78 - 25.72' },
    { color: [168, 0, 0], name: '25.72 - 34.74' },
];


export const DB_INDEXES = ['line_all', 'line_combined', 'trips'];

// export const DB_URL = process.env.NODE_ENV === 'production' ? 'http://elastic:9200' : 'http://localhost:9200';
export const DB_URL = 'http://localhost:9200';

export const MAP_BOX_TOKEN = 'pk.eyJ1IjoiZGlzaGFuazIyIiwiYSI6ImNqc21maTlsNDAwejM0NG8xZnVybzZnMXUifQ.6JAxYFhaB-iZEib-1CkM_Q';

export const STREET_VIEW_TILE = `https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/{z}/{x}/{y}?access_token=${MAP_BOX_TOKEN}`;