import React, { Component } from "react";
import "../App.css";
import L from "leaflet";
import { Map, TileLayer, Marker, Popup, FeatureGroup } from "react-leaflet";
import navPin from "../assets/placeholder.png";
import mapData from "../data/mock.json";

export default class Route extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: [],
      zoom: 13,
    };
  }

  navigationIcon = L.icon({
    iconUrl: navPin,
    iconSize: [50, 50], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [-3, -76],
  });

  componentDidMount = () => {
    const mqtt = require("mqtt");

    var client = mqtt.connect("mqtt://broker.hivemq.com");

    client.on("connect", function () {
      client.subscribe("geodata");
    });

    client.on("message", function (topic, message) {
      // if(message){
      console.log(message.toString());
      client.end();
      // }
      // client.end()
    });
    // console.log(mapData);
    const { features } = mapData;
    let arr = [];
    let coordinates = features[0]?.geometry?.coordinates;
    for (var i = 0; i <= coordinates.length - 1; i++) {
      let obj = {};
      obj.longitude = coordinates[i][0];
      obj.latitude = coordinates[i][1];
      arr.push(obj);
    }

    this.setState({ item: arr });
  };

  render() {
    const positionGreenIcon = [12.683214911818666, 78.3984375];

    return (
      <div>
        <Map className="map" center={positionGreenIcon} zoom={this.state.zoom}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FeatureGroup>
            {this.state.item.map((item) => (
              <>
                <Marker
                  position={[item.latitude, item.longitude]}
                  icon={this.navigationIcon}
                >
                  <Popup>place</Popup>
                </Marker>
              </>
            ))}
          </FeatureGroup>
        </Map>
      </div>
    );
  }
}
