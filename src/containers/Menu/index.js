import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dropdown, Icon } from 'antd';

import TripsMenu from '../../components/TripMenu';

import { fetchSingleTripData, loadMapData, fetchDataByDate, fetchDataByTime } from '../../store/actions/appActions';

import './Menu.css';

class HeaderMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTripItem: 'All Trips',
            selectedDateItem: 'All Dates',
            selectedTimeItem: 'All Times'
        }
    }

    onTripItemClicked = (selectedTripItem) => {
        this.setState({ selectedTripItem });
        if(selectedTripItem !== this.state.selectedTripItem) {
            if(selectedTripItem === 'All Trips') {
                this.props.loadMapData();
            } else {
                this.props.fetchSingleTripData(selectedTripItem);
            }
        }
    }

    onDatesItemClicked = (selectedDateItem) => {
        this.setState({ selectedDateItem });
        if(selectedDateItem !== this.state.selectedDateItem) {
            if(selectedDateItem === 'All Dates') {
                this.props.loadMapData();
            } else {
                this.props.fetchDataByDate(selectedDateItem);
            }
        }
    }

    onTimeItemClicked = (selectedTimeItem) => {
        this.setState({ selectedTimeItem });
        if(selectedTimeItem !== this.state.selectedTimeItem) {
            if(selectedTimeItem === 'All Times') {
                this.props.loadMapData();
            } else {
                this.props.fetchDataByTime(selectedTimeItem);
            }
        }
    }

    render() {
        const { data, time, dates, single_trip, date_trip, time_trip } = this.props;
        const modified_trips_data = ['All Trips', ...data];
        const modified_dates_data = ['All Dates', ...dates];
        const modified_time_data = ['All Times', ...time];
        return (
            <div>
                <div className="menu menu1">
                    <Dropdown
                        disabled={ (date_trip || time_trip) ? true : false }
                        overlay={TripsMenu(modified_trips_data, this.onTripItemClicked)}
                        trigger={['click']}
                        >
                        <a className="ant-dropdown-link" href="#">
                            {this.state.selectedTripItem} <Icon type="down" />
                        </a>
                    </Dropdown>
                </div>
                <div className="menu menu2">
                    <Dropdown 
                        disabled={(single_trip || time_trip) ? true : false} 
                        overlay={TripsMenu(modified_dates_data, this.onDatesItemClicked)} trigger={['click']}
                    >
                        <a className="ant-dropdown-link" href="#">
                            {this.state.selectedDateItem} <Icon type="down" />
                        </a>
                    </Dropdown>
                </div>
                <div className="menu menu3">
                    <Dropdown 
                        disabled={(single_trip || date_trip) ? true : false} 
                        overlay={TripsMenu(modified_time_data, this.onTimeItemClicked)} trigger={['click']}
                    >
                        <a className="ant-dropdown-link" href="#">
                            {this.state.selectedTimeItem} <Icon type="down" />
                        </a>
                    </Dropdown>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        data: state.app.trips,
        dates: state.app.dates,
        time: state.app.time,
        single_trip: state.app.single_trip,
        date_trip: state.app.date_trip,
        time_trip: state.app.time_trip
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchSingleTripData, loadMapData, fetchDataByDate, fetchDataByTime }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderMenu);