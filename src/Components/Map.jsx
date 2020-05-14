/*jshint esversion:6*/
import React from "react";
import {GoogleMap, withScriptjs, withGoogleMap} from "react-google-maps";

function Map(){
  return <GoogleMap defaultZoom={10} defaultCenter={{lat: 19.693558,lng: 72.765518}}/>;
}

const WrappedMap = withScriptjs(withGoogleMap(Map));


class MapComponent extends React.Component{
  constructor(){
    super();
    this.state={

    }
  }

  render(){
    return(
      <div style={{width:"100vw",height:"100vh"}}>
        <WrappedMap googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDc9nHFJgLGeWUWzi_1XZyXH1waulqfL-E`}
          loadingElement={<div style={{height:"100%"}}/>}
          containerElement={<div style={{height:"100%"}}/>}
          mapElement={<div style={{height:"100%"}}/>}
          />
      </div>
    );
  }
}

export default MapComponent;
