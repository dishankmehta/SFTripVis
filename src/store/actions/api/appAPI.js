import API from './config';

export default class AppAPI {
    static getTripsData (index, size, data) {
        return API.post(`/${index}/_search?size=${size}`, data, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }

    static getSingleTrip(index, data) {
        return API.post(`/${index}/_search`, data, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }

    static getIndexTotalRecords(index) {
        return API.get(`/${index}/_search`);
    }
}