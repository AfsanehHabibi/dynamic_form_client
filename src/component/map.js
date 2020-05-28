import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
  
export class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 35.697736,
      lng: 51.386228
    },
    zoom: 11
  };
 
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API_KEY/* YOUR KEY HERE */ }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
        {/* <AnyReactComponent
            lat= {35.697736}
            lng= {51.386228}
            text="My Marker"
          /> */}
        </GoogleMapReact>
      </div>
    );
  }
}
 
class Marker extends React.Component{

}