import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import isEmpty from 'lodash/isEmpty';
import { Popover, Button } from 'antd';
import { StaticMap } from 'react-map-gl';
import DeckGL, { GeoJsonLayer } from 'deck.gl';

import FullPageSpinner from '../../components/FullPageSpinner';
import { getColor, parseDiffernece, infoContent } from './mapUtils';
import { BINS, MAP_BOX_TOKEN } from '../../constants';

import 'leaflet/dist/leaflet.css';
import './map.css';

class MapComponent extends Component {
  state = {
    x: null,
    y: null,
    hoveredObject: null,
    viewState: {
      latitude: 37.7749,
      longitude: -122.4194,
      zoom: 10,
      minZoom: 3,
      maxZoom: 18,
      bearing: 0,
      pitch: 0,
    },
    viewStateCalled: false
  };

  onHover = ({x, y, object}) => {
    this.setState({ x, y, hoveredObject: object });
  }


  renderTooltip() {
    const { x, y, hoveredObject } = this.state;

    if(!hoveredObject) return null;

    const properties = hoveredObject.properties;
    const speed = Math.round(parseFloat(properties.speed_avg)*100)/100;
    const start_time = properties.start_time;
    const end_time = properties.end_time;
    const duration = properties.duration;

    return (
      <div className="tooltip" style={{left: x, top: y}}>
        <div style={{textAlign: 'center', width: '100%', marginBottom: '2px'}}><b>-:Trip Data:-</b></div>
        <div><b>Date:</b><span> </span> <Moment format="MM-DD-YYYY">{start_time}</Moment></div>
        <div><b>Trip start time:</b> <Moment format="HH:mm:ss">{start_time}</Moment></div>
        <div><b>Trip end time:</b><span> </span> <Moment format="HH:mm:ss">{end_time}</Moment></div>
        <div><b>Duration:</b> {parseDiffernece(duration)}</div>
        <div><b>Average Speed:</b> {speed}</div>
      </div>
    );

  }

  renderLegend() {
    return (
      <div className="legend">
        <h4 className="legend-title">San Francisco Bay Area Trips</h4>
        <div className="speed-title">Speed Distribution (m/s)</div>
        <div className="legend-container">
          <div className="legend-color-container">
            {BINS.map((item, index) => {
              return <div key={index} style={{backgroundColor: `rgb(${item.color[0]}, ${item.color[1]}, ${item.color[2]})`}}>
              </div>
            })}
          </div>
          <div className="legend-name-container">
            {BINS.map((item, index) => {
              return <div key={index}>{item.name}</div>
            })}
          </div>
        </div>
      </div>
    );
  }

  renderInfo() {
    const title = <span>{"Map Interaction"}</span>;
    const content = (
        <div>
          <ul>
            {
              infoContent.map((item) => {
                return item
              })
            }
          </ul>
        </div>
    );
    return (
      <Popover className="info-popover" placement="bottomLeft" title={title} content={content} trigger="click">
        <Button icon="exclamation-circle" size={'small'}>
          Map Interaction
        </Button>
      </Popover>
    )
  }

  renderLayers() {
    const { data } = this.props;
    if(isEmpty(data)) return [];
    let layers = [];
    data.forEach((item, index) => {
      const geojson_data = item;
      layers.push(
        new GeoJsonLayer({
          id: index,
          data: geojson_data,
          opacity: 1,
          stroked: false,
          filled: false,
          lineWidthMinPixels: 0.5,
          parameters: {
            depthTest: false
          },
          zIndex: 1,
          getLineColor: f => getColor(f.properties.speed_avg),
          getLineWidth: 2,
          pickable: true,
          onHover: this.onHover
        })
      );
    });
    return layers;
  }

  onViewStateChange = ({ viewState }) => {
    this.setState({ viewState, viewStateCalled: true });
  }

  isLoading() {
    const { data } = this.props;
    return isEmpty(data);
  }

  render() {
    return (
      <div className="map-container">
        {
          this.isLoading() &&
          <FullPageSpinner/>
        }
        <DeckGL
          layers={this.renderLayers()}
          pickingRadius={5}
          viewState={this.state.viewState}
          onViewStateChange={this.onViewStateChange}
          controller={true}
        >
          <StaticMap
            reuseMaps
            mapStyle="mapbox://styles/mapbox/dark-v9"
            preventStyleDiffing={true}
            mapboxApiAccessToken={MAP_BOX_TOKEN}
          />

          {this.renderTooltip()}
          {this.renderLegend()}
          {this.renderInfo()}
        </DeckGL>
      </div>
    );
  }
}



function mapStateToProps(state) {
  return {
    data: state.app.map_data,
    single_trip: state.app.single_trip
  };
}

export default connect(mapStateToProps, null)(MapComponent);
