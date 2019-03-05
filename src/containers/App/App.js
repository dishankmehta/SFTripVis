import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadMapData } from '../../store/actions/appActions';

import { Header } from '../../components/Header';
import Map from '../Map/Map';

import './App.css';

class App extends Component {

  componentDidMount() {
    this.props.loadMapData();
  }

  render() {
    return (
      <div className="App">
        <Header title={"San Francisco Trips"}/>
        <Map/>
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadMapData }, dispatch);
}

export default connect(null, mapDispatchToProps)(App);
