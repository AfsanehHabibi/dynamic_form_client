import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export class SimpleMap extends Component {
  constructor(props) {
    super(props);
    const value = props.value || {};
    this.state = {
      // Same name as valuePropName in getFieldDecorator ('value' is default):
      // https://ant.design/components/form/?locale=en-US#getFieldDecorator(id,-options)-parameters
      value,
      // ...
    };
  }

  handleChange = (value) => {
    this.setState({ value });
    const { onChange } = this.props;
    if (onChange) {
      // This will provide the form with changes
      onChange({ ...this.state, ...{ value } });
    }
  }
  static defaultProps = {
    center: {
      lat: 35.697736,
      lng: 51.386228
    },
    zoom: 11
  };


  _onClick = ({ x, y, lat, lng, event }) => {
    console.debug(x, y, lat, lng)
    /* this.props.onCenterChange([childProps.lat, childProps.lng]);
    console.debug([childProps.lat, childProps.lng]) */
    console.debug("clicked1")
    this.handleChange(`lat:${lat},lng:${lng}`);
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '40vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API_KEY/* YOUR KEY HERE */ }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onClick={this._onClick}
        >

          {/* <AnyReactComponent
            lat= {35.697736}
            lng= {51.386228}
            text="My Marker"
          />  */}
        </GoogleMapReact>
      </div>
    );
  }
}

class Marker extends React.Component {

}